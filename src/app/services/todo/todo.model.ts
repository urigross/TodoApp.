export class Todo {
  constructor(
    public _id?: string,
    public title:string ='',
    public date:Date = new Date(),
    public isDone:boolean = false,
  ){}
  setId?(){
    var txt ='';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < possible.length; i++) {
      txt+= possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this._id = txt
  }
}