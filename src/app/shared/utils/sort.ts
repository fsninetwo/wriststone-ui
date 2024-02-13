export class Sort {
  private sortOrder = 1;
  private collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base"
  });

  constructor(){}

  public startSort(property, order, type = ""){
    if(order === "desc") {
      this.sortOrder = -1;
    }

    return (a, b) => (type === "date")
      ? this.sortData(new Date(a[property]), new Date(b[property]))
      : this.collator.compare(a[property], b[property]) * this.sortOrder;
  }

  private sortData(a: any, b: any) {
    const orderDireection = (a < b)
      ? -1 : (a > b)
        ? 1 : 0

    return orderDireection * this.sortOrder;
  }
}
