import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import createBugsnagClient, { Bugsnag } from 'bugsnag-js';
import { bugsnagClientToken } from './bugsnag.token';
import { AngularBugsnagErrorHandler } from './error-handler';

const bugsnagClient: Bugsnag.Client = createBugsnagClient({
  apiKey: 'api-key',
  appVersion: '0.0.1',
  releaseStage: 'beta',
});

export function BugsnagClientFactory (): Bugsnag.Client {
  return bugsnagClient;
}

bugsnagClient.notify('just run notify');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {provide: bugsnagClientToken, useFactory: BugsnagClientFactory},
    {provide: ErrorHandler, useClass: AngularBugsnagErrorHandler, deps: [bugsnagClientToken]},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
