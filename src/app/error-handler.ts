import {ErrorHandler, Injectable} from '@angular/core';
import Report from 'bugsnag-js/types/report';

@Injectable()
export class AngularBugsnagErrorHandler extends ErrorHandler {
  constructor (private client: any) {
    super();
  }

  public handleError (error: any): void {
    if (!this.client) {
      super.handleError(error);
      return;
    }

    const handledState: any = {
      severity: 'error',
      severityReason: {type: 'unhandledException'},
      unhandled: true,
    };

    const report: Report = new this.client.BugsnagReport(
      error.name,
      error.message,
      this.client.BugsnagReport.getStacktrace(error),
      handledState,
    );

    this.client.notify(report);

    super.handleError(error);
  }
}
