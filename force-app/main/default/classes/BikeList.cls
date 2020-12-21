public with sharing class BikeList {
    public BikeList() {
    }
    @AuraEnabled(cacheable=true)
    public static List<Bike__c> getBikeList(String searchKey){
        if(String.isBlank(searchKey)){
               return new List<Bike__c>();
        }
        String key = '%' + searchKey + '%';
       return [select id,Name,Mileage__c,Brakes__c,Electric_Components__c,Projector_headlamp__c,Wheels__c,Anti_lock_brakes__c,Picture__c,Engine_Type__c,Available__c from Bike__c WHERE Name LIKE : key ];
    }
}