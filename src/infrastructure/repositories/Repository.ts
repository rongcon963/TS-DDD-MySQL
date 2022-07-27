import { IRepository } from '../../core/IRepository';
import { unmanaged, injectable } from 'inversify';
import { createMysqlConnection, Query } from './../db/mysql';
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
    const query = this.collectionInstance.query('SELECT * FROM product');
    const dbResult = await this.collectionInstance.execute(query);
    this.dataMapper.toDomain(dbResult);
    return [];
  }

  async findOneById(guid: string): Promise<TDomainEntity | null> {
    const query = this.collectionInstance.query('SELECT * FROM product WHERE guid = ' + guid);
    const dbResult = await this.collectionInstance.execute(query);
    return this.dataMapper.toDomain(dbResult);
  }

  async findUser(username: string): Promise<TDomainEntity | null> {
    return null;
  }

  async doesExists(guid: string): Promise<boolean> {
    let query = `SELECT * FROM product WHERE guid = '${guid}' limit 1`;
    let check = this.collectionInstance.query(query);
    if (check) {
      return true;
    }
    return false;
  }

  async save(entity: TDomainEntity): Promise<void> {
    const guid = (entity as any).guid;
    const exists = await this.doesExists(guid);
    
      let query = `INSERT INTO product (guid,name,description,instock_quantity,price) VALUES (?,?,?,?,?)`;
      // createMysqlConnection('localhost')
      //   .then((connection) => {
      //     Query(connection,query)
          
      //     .then ((result) => {
      //       return result;
      //     })
      //   })
      //let {name,description,instock_quantity,price} = this.dataMapper.toDalEntity(entity);
      const propertyNames = Object.values(this.dataMapper.toDalEntity(entity));
      await this.collectionInstance.promise().query(query, propertyNames);
      return;
    
    // let update = `UPDATE product SET ? WHERE guid = ? `;
    // const propertyNames = Object.values(this.dataMapper.toDalEntity(entity));
    // await this.collectionInstance.query(update, [{propertyNames},{guid}]);
  }

  async delete(id: string): Promise<void> {
    
  }
}