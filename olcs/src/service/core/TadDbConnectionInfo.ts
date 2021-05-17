import {Provide} from '@midwayjs/decorator';
import {InjectEntityModel} from '@midwayjs/orm';
import {TadDbConnectionInfo} from '../../entity/TadDbConnectionInfo';
import {Repository} from 'typeorm';

@Provide()
export class TadDbConnectionInfoService {
  @InjectEntityModel(TadDbConnectionInfo)
  tadDbConnectionInfoModel: Repository<TadDbConnectionInfo>;

  async findAll() {
    let myResult = await this.tadDbConnectionInfoModel.find();

    console.log("result = ", myResult);
    return myResult;
  }

  async find(id: number) {
    if (id === undefined || id.toString() === '') return null;

    let myResult = await this.tadDbConnectionInfoModel.findOne({connection_id: id});

    console.log("result = ", myResult);
    return myResult;
  }

  async save(
    connection_name: string,
    db_host: string,
    db_port: string,
    db_sid: string,
    db_username: string,
    db_password: string,
    db_type: string) {

    let myObject = new TadDbConnectionInfo();

    myObject.connection_name = connection_name;
    myObject.db_type = db_type;
    myObject.db_host = db_host;
    myObject.db_port = db_port;
    myObject.db_sid = db_sid;
    myObject.db_username = db_username;
    myObject.db_password = db_password;

    const myResult = await this.tadDbConnectionInfoModel.save(myObject);

    console.log('result ', myResult);
    return myResult;
  }

  async update(
    id: number,
    connection_name: string,
    db_host: string,
    db_port: string,
    db_sid: string,
    db_username: string,
    db_password: string,
    db_type: string) {

    let myObject = await this.tadDbConnectionInfoModel.findOne(id);

    myObject.connection_name = connection_name;
    myObject.db_type = db_type;
    myObject.db_host = db_host;
    myObject.db_port = db_port;
    myObject.db_sid = db_sid;
    myObject.db_username = db_username;
    myObject.db_password = db_password;

    const myResult = await this.tadDbConnectionInfoModel.save(myObject);

    console.log('result = ', myResult);
    return myResult;
  }

  async delete(id: number) {
    let myObject = await this.tadDbConnectionInfoModel.findOne(id);

    const myResult = await this.tadDbConnectionInfoModel.remove(myObject);

    console.log('result = ', myResult);
    return myResult;
  }

  async getSchemas(connInfo: TadDbConnectionInfo) {
    let myResult;

    if (connInfo.db_type == "mysql") {
      let myDb = require("mysql");
      let connection = myDb.createConnection({
        host     : '10.12.2.104',
        user     : 'root',
        password : 'root123',
        database : 'olcdb'
      });
      myResult = connection.connect();
      connection.end();
    } else {
      let myDb = require("oracledb");
      let connection = myDb.createConnection({
        host     : '10.12.2.104',
        user     : 'root',
        password : 'root123',
        database : 'olcdb'
      });
      myResult = connection.connect();
      connection.end();
    }

    return myResult;
  }

  async test(connInfo: TadDbConnectionInfo) {

    let myResult;

    if (connInfo.db_type == "mysql") {
      let myDb = require("mysql");
      let connection = myDb.createConnection({
        host     : '10.12.2.104',
        user     : 'root',
        password : 'root123',
        database : 'olcdb'
      });
      myResult = connection.connect();
      connection.end();
    } else {
      let myDb = require("oracledb");
      let connection = myDb.createConnection({
        host     : '10.12.2.104',
        user     : 'root',
        password : 'root123',
        database : 'olcdb'
      });
      myResult = connection.connect();
      connection.end();
    }

    return myResult;
  }
}