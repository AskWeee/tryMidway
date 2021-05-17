import { Provide} from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import {TadProductVersionInfo} from "../../entity/TadProductVersionInfo";

@Provide()
export class TadProductVersionInfoService {
  @InjectEntityModel(TadProductVersionInfo)
  tableModel: Repository<TadProductVersionInfo>;

  async findAll() {
    let myResult = await this.tableModel.find();
    console.log("All connections from the db: ", myResult)
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    let myResult = await this.tableModel.findOne({version_id: id});
    console.log("one connection from the db: ", myResult);

    return myResult;
  }

  async save(name: string, desc: string) {
    let myObject = new TadProductVersionInfo();

    myObject.version_name = name;
    myObject.version_desc = desc;

    const myResult = await this.tableModel.save(myObject);

    console.log('result = ', myResult.version_id);
    return myResult;
  }

  async update(id: number, name: string, desc: string) {
    let myObject = await this.tableModel.findOne(id);

    myObject.version_name = name;
    myObject.version_desc = desc;

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