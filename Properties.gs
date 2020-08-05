/**
   * Класс для управления Properties
   * DocumentProperties or ScriptProperties or UserProperties
   * 
   * Creates an instance of Props.
   * @param {string} prop
   * @memberof Props
   * @constructor
   * https://developers.google.com/apps-script/reference/properties
   * @example
   * const testProps=()=>{
   * const scrProp=new Props("ScriptProperties");
   * scrProp.set("v","1")
   * concole.log(scrProp.get("v"))
   * }
   * @return {} Class Properties
   */
class Props {
    constructor(prop) {
      this[prop] = PropertiesService['get'+prop]();
      this.type=prop
      return this;
  }

  get(name) {
      return this[this.type].getProperty(name);
  }
  
   getProperties(name) {
      return this[this.type].getProperties();
  }
  type(prop) {
      return this.type;
  }
  set(name, value) {
      return this[this.type].setProperty(name, value);
  }

  forget(name) {
      return this[this.type].deleteProperty(name);
  }
 
  getKeys() {
      return this[this.type].getKeys();
  }
    has(callback,name) {
      return this[this.type].getKeys().some(callback,element);
  }
    
  deleteAllProperties(){
   this[this.type].deleteAllProperties();
  }
    
  setProperties(properties){
   this[this.type].setProperties(properties);
  }
  setProperties(properties, deleteAllOthers){
   this[this.type].setProperties(properties, deleteAllOthers);
  }
}