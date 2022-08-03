import { IRepository } from '../../core/IRepository';
import { unmanaged, injectable } from 'inversify';
import {Connection} from "mysql2";
import { IDataMapper } from '../../core/IDataMapper';

@injectable()
export class Repository<TDomainEntity>
implements IRepository<TDomainEntity> {
  private readonly collectionInstance: Connection;
  private readonly dataMapper: IDataMapper<TDomainEntity>;

  constructor(
    @unmanaged() collectionInstance: Connection,
    @unmanaged() dataMapper: IDataMapper<TDomainEntity>,
  ) {
    this.collectionInstance = collectionInstance;
    this.dataMapper = dataMapper;
  }

  async findAll(): Promise<TDomainEntity[]> {
    const query = `SELECT * FROM product`;
    const [dbResult,] = await this.collectionInstance.promise().query(query);
    return (dbResult as any).map((result: any) => this.dataMapper.toDomain(result));
  }

  async findOneById(guid: string): Promise<TDomainEntity | null> {
    const query = `SELECT * FROM product WHERE guid = '${guid}'`;
    const [dbResult,] = await this.collectionInstance.promise().query(query);
    return this.dataMapper.toDomain((dbResult as any)[0]);
  }

  async findUser(username: string): Promise<TDomainEntity | null> {
    return null;
  }

  async doesExists(guid: string): Promise<boolean> {
    const query = `SELECT * FROM product WHERE guid = '${guid}' limit 1`;
    const [check,] = await this.collectionInstance.promise().query(query);

    return !!(check as any)[0];
  }

  async save(entity: TDomainEntity): Promise<void> {
    const guid = (entity as any).guid;
    const exists = await this.doesExists(guid);
    
    if(!exists) {
      let query = `INSERT INTO product (guid,name,description,instock_quantity,price) VALUES (?,?,?,?,?)`;
      
      const propertyNames = Object.values(this.dataMapper.toDalEntity(entity));
      await this.collectionInstance.promise().query(query, propertyNames);
      return;
    }
    let query = `UPDATE product SET guid=?,name=?,description=?,instock_quantity=?,price=? WHERE guid= '${guid}' `;
    const propertyNames = Object.values(this.dataMapper.toDalEntity(entity));
    await this.collectionInstance.promise().query(query, propertyNames);
  }

  async delete(id: string): Promise<void> {
    const query = `DELETE FROM product WHERE guid= '${id}' `;
    await this.collectionInstance.promise().query(query);
  }
}