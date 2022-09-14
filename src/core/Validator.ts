export default class Validator{
    rules: any
    errors: any
    post: any
    messages = {
        "required": "O campo ':field' é obrigatório",
        "number": "O campo ':field' deve ser um número.",
        "unknownMethod": "Validação desconhecida chamada em :field.",
        "unknownLabel": "Tradução :field não encontrada",
    }
    
    constructor(rules:any){
        this.rules = rules
        this.errors = {}
        this.post = {}
    }
    setErrors(field:string, message:string): void {
        if (this.errors[field]===undefined){
            this.errors[field] = [];
        }
        this.errors[field].push(message);
    }
    hasErrors(): boolean {
        let foundError = false;
        for (let e in this.errors){
            if (this.errors[e] !== undefined && Array.isArray(this.errors[e]) && this.errors[e].length > 0){
                foundError = true;
                break;
            }
        }
        return foundError;
    }
    getErrors(field:string = ''): any {
        return (field ? this.errors[field] : this.errors);
    }
    processMessages(key: string, params: any): string {
        let messager:string;
        if (this.messages.hasOwnProperty(key)) {
            messager = this.messages[key]
        } else {
            messager = this.messages["unknownLabel"]
        }
        for(let replacement in params){
            let value = params[replacement]
            let regex = new RegExp(`:${replacement}`)
            messager = messager.replace(regex, value)
        }

        return messager;
    }
    validate(post:any): boolean {
        this.post = post
        this.errors = {}

        for (let field in this.rules) {
            const rules = this.rules[field].split('|')
            rules.forEach((rule:string) => {
                if (rule in this && typeof this[rule] === "function") {
                    if(!this[rule](field)) {
                        this.setErrors(field, this.processMessages(rule, { field }))
                    }
                } else {
                    this.setErrors(field, this.processMessages("unknownMethod", { 'field': rule }))
                }
            })
        }
        if (this.hasErrors()) {
            return false
        }
        return true
    }

    required(attribute:string): boolean {
        let notNull = (this.post[attribute] != null && this.post[attribute] != "null");
        let notUndefined = (this.post[attribute] != undefined && this.post[attribute] != "undefined");

        return ((notNull && notUndefined && this.post[attribute].toString() != '') ? true : false);
    }
    number(attribute:string):boolean {
        return /^[0-9]{1,}$/.test(this.post[attribute]) ? true : false;
    }
}