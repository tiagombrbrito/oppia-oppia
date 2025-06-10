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
 * @fileoverview Unit tests for search bar filters modal component.
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {waitForAsync} from '@angular/core/testing';
import {SearchBarFiltersModalComponent} from './search-bar-filters-modal.component';

describe('search-bar-filters-modal component', () => {
  let component: SearchBarFiltersModalComponent;
  let fixture: ComponentFixture<SearchBarFiltersModalComponent>;
  let activeModalSpy: jasmine.SpyObj<NgbActiveModal>;

  beforeEach(waitForAsync(() => {
    activeModalSpy = jasmine.createSpyObj('NgbAtiveModal', [
      'close',
      'dismiss',
    ]);
    TestBed.configureTestingModule({
      imports: [FormsModule, MatCheckboxModule, TranslateModule.forRoot()],
      declarations: [SearchBarFiltersModalComponent],
      providers: [
        {
          provide: NgbActiveModal,
          useValue: activeModalSpy,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarFiltersModalComponent);
    component = fixture.componentInstance;

    component.filterOption = 'languages';
    component.selectionDetails = {
      languages: {
        masterList: [
          {id: 'en', text: 'English'},
          {id: 'fr', text: 'French'},
        ],
        selections: {en: true, fr: false},
      },
      categories: {
        masterList: [{id: 'math', text: 'Mathematics'}],
        selections: {math: true},
      },
    };
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render "Subjects" if filterOption is "categories"', () => {
    component.filterOption = 'categories';
    fixture.detectChanges();
    const h3 = fixture.nativeElement.querySelector('h3');
    expect(h3.textContent).toContain('Subjects');
  });

  it('should render "Languages" if filterOption is "languages"', () => {
    component.filterOption = 'languages';
    fixture.detectChanges();
    const h3 = fixture.nativeElement.querySelector('h3');
    expect(h3.textContent).toContain('Languages');
  });

  it('should uncheck all selections when deselectAll is called', () => {
    component.filterOption = 'languages';
    component.selectionDetails = {
      languages: {
        description: '',
        itemsName: '',
        masterList: [{id: 'en'}, {id: 'fr'}],
        selections: {en: true, fr: true},
        numSelections: 2,
        summary: '',
      },
      categories: {
        description: '',
        itemsName: '',
        masterList: [],
        selections: {},
        numSelections: 0,
        summary: '',
      },
    };

    component.deselectAll('languages');

    expect(component.selectionDetails.languages.selections.en).toBeFalse();
    expect(component.selectionDetails.languages.selections.fr).toBeFalse();
  });

  it('should close modal with updated filters', () => {
    component.filterOption = 'languages';
    component.selectionDetails = {
      languages: {
        description: 'Languages',
        itemsName: 'languages',
        masterList: [],
        selections: {},
        numSelections: 0,
        summary: '',
      },
    };

    component.close();

    expect(activeModalSpy.close).toHaveBeenCalledWith({
      filterType: 'languages',
      updatedFilters: component.selectionDetails,
    });
  });
  it('should dismiss the modal', () => {
    component.dismiss();
    expect(activeModalSpy.dismiss).toHaveBeenCalled();
  });

  it('should render checkboxes for each masterList item', () => {
    component.filterOption = 'languages';
    component.selectionDetails = {
      languages: {
        description: 'Languages',
        itemsName: 'languages',
        masterList: [
          {id: 'en', text: 'English'},
          {id: 'fr', text: 'French'},
        ],
        selections: {en: true, fr: false},
        numSelections: 0,
        summary: '',
      },
    };

    fixture.detectChanges();

    const checkboxes = fixture.nativeElement.querySelectorAll(
      'mat-checkbox .mat-checkbox-label'
    );
    expect(checkboxes.length).toBe(2);
    expect(checkboxes[0].textContent).toContain('English');
    expect(checkboxes[1].textContent).toContain('French');
  });
});
