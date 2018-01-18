import {InjectionToken} from '@angular/core';
import {Bugsnag} from 'bugsnag-js';

export const bugsnagClientToken: InjectionToken<Bugsnag.Client> = new InjectionToken('bugsnag-client');
