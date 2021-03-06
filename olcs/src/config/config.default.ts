import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1620874410494_767';

  // add your config here
  config.middleware = [];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    }
  }

  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  return config;
};

export const orm = {
  type: 'mysql',
  host: '10.12.2.104',
  port: 3306,
  username: 'root',
  password: 'root123',
  database: 'olcdb',
  synchronize: false,
  logging: false,
};

// export tester = {
//   message: "hello world"
// }
// export tester = {
//   message: "hello world"
// }
