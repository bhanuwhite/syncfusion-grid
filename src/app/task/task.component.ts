import { Component, OnInit, ViewChild } from '@angular/core';
// import { dataSource, virtualData, sampleData } from './data';
import data from '../../assets/data/data.json';
import { NumericTextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { Browser } from '@syncfusion/ej2-base';
import {
  TreeGridComponent, FreezeService, PageService, SortService, FilterService, ReorderService,
  RowDDService, SelectionService, ContextMenuService
} from '@syncfusion/ej2-angular-treegrid';
import { EditSettingsModel } from '@syncfusion/ej2-treegrid';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { dataInterface } from './sampleData';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [PageService, SortService, FilterService, ReorderService, FreezeService, RowDDService,
    SelectionService, ContextMenuService]
})
export class TaskComponent implements OnInit {

  @ViewChild('treegrid', { static: true })
  public treegrid: TreeGridComponent;

  @ViewChild('rows', { static: true })
  public rows: NumericTextBoxComponent;

  @ViewChild('columns', { static: true })
  public columns: NumericTextBoxComponent;

  @ViewChild('dropdown1', { static: true })
  public dropdown1: DropDownListComponent;

  @ViewChild('dropdown2', { static: true })
  public dropdown2: DropDownListComponent;

  @ViewChild('template1', { static: true })
  template1: DialogComponent;

  @ViewChild('template2', { static: true })
  template2: DialogComponent;

  @ViewChild('template3', { static: true })
  template3: DialogComponent;

  public data: dataInterface[];
  public initialSort: Object;
  public pageSettings: Object;
  public selectOptions: Object;
  public contextMenuItems: Object;
  public editing: EditSettingsModel;
  public editparams: Object;
  public d1data: Object;
  public ddlfields: Object;
  public d2data: Object;
  public fields: Object;
  public height: string = '250px';
  public columnName: any = 'taskID';
  public colorName: any = "black";
  public fweight: any = '400';
  public fsize: any = '14';
  public alignmentText: any = 'Right';
  public columnValue: number = Browser.isDevice ? 1 : 2;

  constructor() {

  }

  ngOnInit(): void {
    /**
     * For Passign Data onto the table
     * **/
    this.data = data

    /**
     * For sorting table
     * ***/
    this.initialSort = {
      columns: [{ field: 'Freight', direction: 'Ascending' },
      { field: 'CustomerName', direction: 'Descending' }]
    };

    /****
     * For paging
     * ***/
    this.pageSettings = { pageCount: 2, pageSizes: true }

    /****
     * For Multiselect
     * ****/
    this.selectOptions = {
      type: 'Multiple'
      //  ,mode: 'Cell', cellSelectionMode: 'Box'
    };

    /***
     * Context Menu
     * *****/
    this.contextMenuItems = [
      'Edit', 'Delete', 'Save', 'Cancel', 'AddRow',
      { text: 'Copy', target: '.e-content', id: 'copyFile' },
      { text: 'Copy With Header', target: '.e-content', id: 'copyFileHeader' },
      { text: 'Cut', target: '.e-content', id: 'cutFile' },
      { text: 'Color', target: '.e-headercontent', id: 'color' },
      { text: 'Font', target: '.e-headercontent', id: 'fontId' },
      { text: 'Alignment', target: '.e-headercontent', id: 'alignId' }
    ]

    /****
     * Alignment 
     * **/

    this.d1data = [{ id: 'taskID', name: 'Task ID' }, { id: 'startDate', name: 'Start Date' },
    { id: 'duration', name: 'Duration' }, { id: 'progress', name: 'Progress' }],

      this.ddlfields = { text: 'name', value: 'id' };

    this.d2data = [{ id: 'Right', name: 'Right' }, { id: 'Left', name: 'Left' },
    { id: 'Center', name: 'Center' }, { id: 'Justify', name: 'Justify' }],

      this.fields = { text: 'name', value: 'id' };

    /****
     * Editing tool
     * *****/
    this.editing = { allowDeleting: true, allowEditing: true, allowAdding: true, mode: 'Row' };
    this.editparams = { params: { format: 'n' } };

  }

  initial:boolean = true;
  dataBound() {
    if (this.initial === true) {
        this.treegrid.collapseAll();
        this.initial = false;
    }
  }

  //After clicking 'Set' button, the `frozenRows` and `frozenColumns` values will be updated in Grid.
  public btnClick(): void {
    this.treegrid.frozenRows = this.rows.value;
    this.treegrid.frozenColumns = this.columns.value;

  }

  public colorFunction(): void {
    this.template1.hide();
  }

  public fontFunction(): void {
    this.fsize = `${this.fsize}px`
    // console.log(this.fsize)
    this.template2.hide();
  }

  public AlignmentFunction(): void {
    this.template3.hide();
  }

  public onChange(e: ChangeEventArgs): void {
    this.columnName = <string>e.value;
    let alignment: any = this.treegrid.getColumnByField(this.columnName).textAlign;
    this.dropdown2.value = alignment;
  }

  public change(e: ChangeEventArgs): void {
    console.log(this.dropdown1)
    let alignment: any = e.value;
    try {
      this.treegrid.getColumnByField(this.columnName).textAlign = alignment;
      this.treegrid.refreshColumns();
    } catch (e) { }
  }

  public contextMenuOpen(e: any): void {
    // console.log(e)
  }
  public contextMenuClick(e: any): void {
    // console.log(e)
    this.treegrid.copyHierarchyMode = 'Parent';
    if (e.item.id === 'copyFile') {
      this.treegrid.copy();
    }
    else if (e.item.id === 'copyFileHeader') {
      this.treegrid.copy(true);
    }
    else if (e.item.id === 'color') {
      this.template1.show();
    }
    else if (e.item.id === 'fontId') {
      this.template2.show();
    }
    else if (e.item.id === 'alignId') {
      this.template3.show();
    }
    else if (e.item.id === 'cutFile') {
      this.treegrid.copy(true);
      this.treegrid.deleteRecord()
    }
  }
}