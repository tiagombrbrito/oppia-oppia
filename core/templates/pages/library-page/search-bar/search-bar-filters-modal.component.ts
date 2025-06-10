// Copyright 2022 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Controller for the search-bar-filters-modal.
 */

import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SelectionDetails} from 'services/search.service';
import {Input} from '@angular/core';
import {I18nLanguageCodeService} from 'services/i18n-language-code.service';

@Component({
  selector: 'search-bar-filters-modal',
  templateUrl: './search-bar-filters-modal.component.html',
})
export class SearchBarFiltersModalComponent {
  @Input() selectionDetails!: SelectionDetails;
  @Input() filterOption!: string;
  modalDirection!: string;

  constructor(
    private activeModal: NgbActiveModal,
    private i18nLanguageCodeService: I18nLanguageCodeService
  ) {}

  close(): void {
    this.activeModal.close({
      filterType: this.filterOption,
      updatedFilters: this.selectionDetails,
    });
  }

  deselectAll(itemsType: string): void {
    let masterList = this.selectionDetails[itemsType].masterList;
    for (let option of masterList) {
      this.selectionDetails[itemsType].selections[option.id] = false;
    }
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }
  ngOnInit(): void {
    this.modalDirection =
      this.i18nLanguageCodeService.getCurrentLanguageDirection();
  }
}
