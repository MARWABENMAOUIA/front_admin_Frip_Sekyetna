export class Produit {
    constructor(
        public id?: number,
        public images?: string[],
        public nom?: string,
        public prix?: number,
        public descript?: string,
    ) {}
}
