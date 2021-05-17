import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadDbUser} from "../../entity/TadDbUser";

@Provide()
export class TadDbUserService {
  @InjectEntityModel(TadDbUser)
  tableModel: Repository<TadDbUser>;

  async findAll() {
    let myResult = await this.tableModel.find();
    console.log("All connections from the db: ", myResult)
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    let myResult = await this.tableModel.findOne({user_id: id});
    console.log("one connection from the db: ", myResult);

    return myResult;
  }

  async save(name: string, desc: string) {
    let myObject = new TadDbUser();

    myObject.user_name = name;
    myObject.user_desc = desc;

    const myResult = await this.tableModel.save(myObject);

    console.log('result = ', myResult.user_id);
    return myResult;
  }

  async update(id: number, name: string, desc: string) {
    let myObject = await this.tableModel.findOne(id);

    myObject.user_name = name;
    myObject.user_desc = desc;

    const myResult = await this.tableModel.save(myObject);

    console.log('result = ', myResult);
    return myResult;
  }

  async delete(id: number) {
    let myObject = await this.tableModel.findOne(id);

    const myResult = await this.tableModel.remove(myObject);

    console.log('result = ', myResult);
    return myResult;
  }

  async test() {

  }
}
