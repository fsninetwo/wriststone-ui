import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnChanges {
  @Output() changePage = new EventEmitter<{
    index: number;
    size: number;
  }>();
  @Input() currentPage = 1;
  @Input() pageSize = 10;
  @Input() itemsPerPage = 1;
  @Input() totalCount = 0;
  @Input() maxPages = 10;

  startPage = 1;
  endPage = 1;
  totalPages = 1;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalCount']) {
      this.totalPages = Math.ceil(this.totalCount / this.itemsPerPage);
    }
  }

  onPageChange(page: number) {
    page = page < 1 ? 1 : page > this.totalPages ? this.totalPages : page;
    this.setCurrentPage(page);
  }

  setCurrentPage(page: number) {
    if (this.currentPage != page) {
      this.changePage.emit({ index: page * this.itemsPerPage, size: this.pageSize });
    }
  }

  public counter() {
    let array = new Array();
    let startPage = this.currentPage - this.totalPages / 2;
    let endPage = this.currentPage + this.totalPages / 2;

    if (startPage < 1) {
      startPage = 1;
    }

    if (endPage > this.totalPages) {
      endPage = this.totalPages;
    }

    if (startPage === endPage) {
      return [];
    }

    for (let i = startPage; i <= endPage; i++) {
      array.push(i);
    }

    return array;
  }
}
