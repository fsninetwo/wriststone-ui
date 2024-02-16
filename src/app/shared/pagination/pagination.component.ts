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
  styleUrls: ["./pagination.component.css"]
})
export class PaginationComponent implements OnChanges {
  @Output() changePage = new EventEmitter<{
    index: number;
    size: number
  }>();
  @Input() pageIndex = 1;
  @Input() pageSize = 10;
  @Input() itemsPerPage = 10;
  @Input() totalSize = 0;

  pager?: Pager;

  ngOnChanges(changes: SimpleChanges) {
    if(changes["pageIndex"]){
      this.setPage(this.pageIndex);
    }
  }

  setPage(page: number) {
    // get new pager object for specified page
    this.pager = this.paginate(
      this.totalSize,
      page,
      this.pageSize,
      this.itemsPerPage
    );

    this.changePage.emit({index: this.pager.currentPage, size: this.pager.pageSize});
  }

  paginate(
    totalSize: number,
    currentPage: number = 1,
    pageSize: number = 10,
    maxPages: number = 10
  ): Pager {
    // calculate total pages
    let totalPages = Math.ceil(totalSize / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= maxPages) {
      // total pages less than max so show all pages
      startPage = 1;
      endPage = totalPages;
    } else {
      // total pages more than max so calculate start and end pages
      let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        // current page near the start
        startPage = 1;
        endPage = maxPages;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        // current page near the end
        startPage = totalPages - maxPages + 1;
        endPage = totalPages;
      } else {
        // current page somewhere in the middle
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalSize - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      (i) => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalSize,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  }
}

export interface Pager {
  totalSize: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[];
}
