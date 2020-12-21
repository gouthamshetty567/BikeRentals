import { LightningElement,api } from 'lwc';
import { createMessageContext,subscribe} from 'lightning/messageService';
import SAMPLE_MESSAGE from "@salesforce/messageChannel/SampleMessageChannel__c";
import NAME_FIELD from '@salesforce/schema/Bike__c.Name';
import ENGINE_TYPE__C_FIELD from '@salesforce/schema/Bike__c.Engine_Type__c';
import MILEAGE__C_FIELD from '@salesforce/schema/Bike__c.Mileage__c';
//import DESCRIPTION__C_FIELD from '@salesforce/schema/Bike__c.Description__c';
import PICTURE__C_FIELD from '@salesforce/schema/Bike__c.Picture__c';
import ANTI_LOCK_BRAKES__C_FIELD from '@salesforce/schema/Bike__c.Anti_lock_brakes__c';
import BRAKES__C_FIELD from '@salesforce/schema/Bike__c.Brakes__c';
import ELECTRIC_COMPONENTS__C_FIELD from '@salesforce/schema/Bike__c.Electric_components__c';
import PROJECTOR_HEADLAMP__C_FIELD from '@salesforce/schema/Bike__c.Projector_headlamp__c';
import WHEELS__C_FIELD from '@salesforce/schema/Bike__c.Wheels__c';

export default class BikeSub extends LightningElement {
context = createMessageContext();
subscription = null;
@api bikeId;
@api objectApiName='Bike__c';
fields = [PICTURE__C_FIELD,NAME_FIELD,WHEELS__C_FIELD,PROJECTOR_HEADLAMP__C_FIELD,BRAKES__C_FIELD,ELECTRIC_COMPONENTS__C_FIELD,ENGINE_TYPE__C_FIELD,MILEAGE__C_FIELD,ANTI_LOCK_BRAKES__C_FIELD];
connectedCallback(){
    this.subscribeMessageChannel();
}

subscribeMessageChannel(){
    subscribe(this.context, SAMPLE_MESSAGE, (message) => this.handleMessage(message));
}
    handleMessage(message) {        
    this.bikeId = message.recordId;   
}
}

