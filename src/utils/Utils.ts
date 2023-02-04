import _ from "lodash";

class EventEmitter {
  constructor() {
    // this.events = {};
  }
}

class FuseUtils {
  static setRoutes(
    config: { routes: any; auth: null; settings: any },
    defaultAuth: any
  ) {
    let routes = [...config.routes];

    routes = routes.map((route) => {
      let auth =
        config.auth || config.auth === null ? config.auth : defaultAuth || null;
      auth = route.auth || route.auth === null ? route.auth : auth;
      const settings = _.merge({}, config.settings, route.settings);

      return {
        ...route,
        settings,
        auth,
      };
    });

    return [...routes];
  }

  static generateRoutesFromConfigs(configs?: any, defaultAuth?: any) {
    let allRoutes: any = [];
    configs.forEach((config?: any) => {
      allRoutes = [...allRoutes, ...this.setRoutes(config, defaultAuth)];
    });
    return allRoutes;
  }

  static EventEmitter = EventEmitter;
}

export default FuseUtils;
