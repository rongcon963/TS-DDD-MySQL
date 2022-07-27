import { Entity } from '../../core/Entity';
import { IAggregateRoot } from '../../core/IAggregateRoot';

export interface IProductProps {
    name: string;
    description: string;
    instockQuantity: number;
    price: number;
}

export class Product extends Entity<IProductProps> implements IAggregateRoot {
    private _name: string;
    private _description: string;
    private _instockQuantity: number;
    private _price: number;

    constructor({ name, description, instockQuantity, price }: IProductProps, guid?: string) {
        super(guid);
        this._name = name;
        this._description = description;
        this._instockQuantity = instockQuantity;
        this._price = price;
    }

    get name() {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get description() {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    }

    get instockQuantity() {
        return this._instockQuantity;
    }

    set instockQuantity(instockQuantity: number) {
        this._instockQuantity = instockQuantity;
    }

    get price() {
        return this._price;
    }

    set price(price: number) {
        this._price = price;
    }

    public static create(props: IProductProps, guid?: string) {
        return new Product(props, guid);
    }
}