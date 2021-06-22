//code from https://sankhadip.medium.com/how-to-sort-table-rows-according-column-in-angular-9-b04fdafb4140

export class sort{
    private order = 1;
    private collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: "base",
    });

    constructor(){}

    public startSort(property, order, type=""){
        if(order === "desc"){
            this.order = -1;
        }
        return (a, b) => {
            if(type === "date"){
                return this.sortData(new Date(a[property]), new Date(b[property]));
            }else{
                return this.collator.compare(a[property], b[property]) * this.order;
            }
        }
    }

    private sortData(a, b){
        if(a<b){
            return -1*this.order;
        }else if(a>b){
            return 1*this.order;
        }else{
            return 0*this.order;
        }
    }
}