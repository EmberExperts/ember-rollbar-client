export function initialize(appInstance) {
  let rollbarService = appInstance.lookup('service:rollbar');
  rollbarService.registerLogger();
}

export default {
  name: 'rollbar',
  initialize
};
