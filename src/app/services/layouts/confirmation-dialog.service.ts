import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, inject, ViewContainerRef } from '@angular/core';

import { Subject } from 'rxjs';
import { ConfirmationDialogComponent } from '../../components/layouts/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  // componentRef = inject(ViewContainerRef);
  constructor(
  ) {}

  confirm(type: string, message: string): Subject<boolean> {
    const subject = new Subject<boolean>();

    console.log(type, message);
    // console.log(this.componentRef);
    // const componentRef = componentFactory.createComponent(ConfirmationDialogComponent);

    // componentRef.type = type;
    // componentRef.message = message;
    // componentRef.hidden = false;

    // componentRef.confirm.subscribe(() => {
    //   subject.next(true);
    //   this.closeDialog(componentRef);
    // });

    // componentRef.cancel.subscribe(() => {
    //   subject.next(false);
    //   this.closeDialog(componentRef);
    // });

    // this.appRef.attachView(componentRef.hostView);

    // const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    // document.body.appendChild(domElem);

    return subject;
  }

  // private closeDialog(componentRef: any) {
  //   this.appRef.detachView(componentRef.hostView);
  //   componentRef.destroy();
  // }
}
