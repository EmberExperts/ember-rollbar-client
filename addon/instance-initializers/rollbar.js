
export function initialize(appInstance) {
  let rollbarService = appInstance.lookup('service:rollbar');
  rollbarService.registerHandler(rollbarService.get('enabled'));
}

export default {
  name: 'rollbar',
  initialize
};
