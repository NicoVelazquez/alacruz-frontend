import * as UIkit from 'uikit';

export class Notification {

  static notify(message: string, status: string) {
    UIkit.notification({
      message,
      status,
      pos: 'top-center',
      timeout: 2000
    });
  }

}

