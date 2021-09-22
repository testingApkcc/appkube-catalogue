import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Collapse } from 'reactstrap';
import openFolderIcon from '../../img/open-folder.png';
import { v4 } from 'uuid';

class AddLibraryPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appName: null,
            dataSource: null,
            catalogName: null,
            catalogId: null,
            isApiCalled: false,
            openLibrarymodal: false,
            folderArray: [{
                "id": 1602,
                "title": "GCP",
                "parentId": null,
                "isOpened": false,
                "isChecked": false,
                "isFolder": true,
                "subData": [],
                "hasChild": false,
                "createdBy": "System Admin",
                "lastModified": "03/03/2021 by System Admin"
            }, {
                "id": 1601,
                "title": "AZURE",
                "parentId": null,
                "isOpened": false,
                "isChecked": false,
                "isFolder": true,
                "subData": [],
                "hasChild": false,
                "createdBy": "System Admin",
                "lastModified": "03/03/2021 by System Admin"
            }, {
                "id": 1105,
                "title": "NGINX",
                "parentId": null,
                "isOpened": false,
                "isChecked": false,
                "isFolder": true,
                "subData": [{
                    "id": 1106,
                    "title": "NGINX-2",
                    "parentId": 1105,
                    "isOpened": false,
                    "isChecked": false,
                    "isFolder": true,
                    "subData": [],
                    "hasChild": false,
                    "createdBy": "System Admin",
                    "lastModified": "08/09/2020 by System Admin"
                }],
                "hasChild": true,
                "createdBy": "System Admin",
                "lastModified": "08/09/2020 by System Admin"
            }, {
                "id": 1101,
                "title": "AWS",
                "parentId": null,
                "isOpened": false,
                "isChecked": false,
                "isFolder": true,
                "subData": [{
                    "id": 1607,
                    "title": "Amazon ECS-Events",
                    "parentId": 1101,
                    "isOpened": false,
                    "isChecked": false,
                    "isFolder": true,
                    "subData": [],
                    "hasChild": false,
                    "createdBy": "System Admin",
                    "lastModified": "25/03/2021 by System Admin"
                }, {
                    "id": 1606,
                    "title": "Amazon SNS - CloudTrail Events",
                    "parentId": 1101,
                    "isOpened": false,
                    "isChecked": false,
                    "isFolder": true,
                    "subData": [],
                    "hasChild": false,
                    "createdBy": "System Admin",
                    "lastModified": "25/03/2021 by System Admin"
                }, {
                    "id": 1609,
                    "title": "Amazon SNS - Overview",
                    "parentId": 1101,
                    "isOpened": false,
                    "isChecked": false,
                    "isFolder": true,
                    "subData": [],
                    "hasChild": false,
                    "createdBy": "System Admin",
                    "lastModified": "26/03/2021 by System Admin"
                }, {
                    "id": 1604,
                    "title": "Amazon SQS - CloudTrail Events",
                    "parentId": 1101,
                    "isOpened": false,
                    "isChecked": false,
                    "isFolder": true,
                    "subData": [],
                    "hasChild": false,
                    "createdBy": "System Admin",
                    "lastModified": "23/03/2021 by System Admin"
                }, {
                    "id": 1608,
                    "title": "AWS Elastic Load Balancer- Overview",
                    "parentId": 1101,
                    "isOpened": false,
                    "isChecked": false,
                    "isFolder": true,
                    "subData": [],
                    "hasChild": false,
                    "createdBy": "System Admin",
                    "lastModified": "26/03/2021 by System Admin"
                }, {
                    "id": 1605,
                    "title": "AWS Lambda Cloudtrail events - Security",
                    "parentId": 1101,
                    "isOpened": false,
                    "isChecked": false,
                    "isFolder": true,
                    "subData": [],
                    "hasChild": false,
                    "createdBy": "System Admin",
                    "lastModified": "24/03/2021 by System Admin"
                }, {
                    "id": 1603,
                    "title": "Kinesis Stream",
                    "parentId": 1101,
                    "isOpened": false,
                    "isChecked": false,
                    "isFolder": true,
                    "subData": [],
                    "hasChild": false,
                    "createdBy": "System Admin",
                    "lastModified": "23/03/2021 by System Admin"
                }, {
                    "id": 1102,
                    "title": "RDS",
                    "parentId": 1101,
                    "isOpened": false,
                    "isChecked": false,
                    "isFolder": true,
                    "subData": [],
                    "hasChild": false,
                    "createdBy": "System Admin",
                    "lastModified": "08/09/2020 by System Admin"
                }, {
                    "id": 1104,
                    "title": "VPC",
                    "parentId": 1101,
                    "isOpened": false,
                    "isChecked": false,
                    "isFolder": true,
                    "subData": [],
                    "hasChild": false,
                    "createdBy": "System Admin",
                    "lastModified": "08/09/2020 by System Admin"
                }, {
                    "id": 1103,
                    "title": "VPN",
                    "parentId": 1101,
                    "isOpened": false,
                    "isChecked": false,
                    "isFolder": true,
                    "subData": [],
                    "hasChild": false,
                    "createdBy": "System Admin",
                    "lastModified": "08/09/2020 by System Admin"
                }],
                "hasChild": true,
                "createdBy": "System Admin",
                "lastModified": "08/09/2020 by System Admin"
            }],
            checkedFolder: [],
            isAlertOpen: false,
            message: null,
            severity: null,
        };
        this.addlibraryRef = React.createRef();
        // this.addToLibrary = this.addToLibrary.bind(this);
        // this.onChange = this.onChange.bind(this);
        // this.handleCloseAlert = this.handleCloseAlert.bind(this);
    }

    toggle = (selectedCatalogName, selectedCatalogId) => {
        this.setState({
            modal: !this.state.modal,
            catalogName: selectedCatalogName,
            catalogId: selectedCatalogId,
            checkedFolder: [],
            appName: null
        });
    };

    closeModel = () => {
        this.setState({
            //catalogName: '',
            catalogId: null,
            modal: !this.state.modal,
            checkedFolder: [],
            appName: null
        });
    }

    onClickOpenSubFolderArr = (indexArr) => {
        const { folderArray } = this.state;
        const folder = this.findChild(folderArray, [...indexArr]);
        folder.isOpened = !folder.isOpened;
        this.setState({
            folderArray
        });
    }

    findChild = (folderList, indexArr) => {
        const index = indexArr.splice(0, 1)[0];
        if (indexArr.length === 0) {
            return folderList[index];
        } else {
            return this.findChild(folderList[index].subData, indexArr);
        }
    };

    checkUnCheckChild = (folderList, checked) => {
        const length = folderList.length;
        for (let i = 0; i < length; i++) {
            const folder = folderList[i];
            folder.isChecked = checked;
            if (folder.isFolder) {
                this.checkUnCheckChild(folder.subData, checked);
            }
        }
    };

    unCheckParent = (folderList, indexArr) => {
        if (indexArr.length > 0) {
            let child = this.findChild(folderList, [...indexArr]);
            child.isChecked = false;
            indexArr.splice(indexArr.length - 1, 1);
            this.unCheckParent(folderList, indexArr);
        }
    };

    checkParent = (folderList, indexArr) => {
        if (indexArr.length > 0) {
            let child = this.findChild(folderList, [...indexArr]);
            if (child.isFolder) {
                const length = child.subData.length;
                let isChecked = true;
                for (let i = 0; i < length; i++) {
                    if (!child.subData[i].isChecked) {
                        isChecked = false;
                    }
                }
                if (isChecked) {
                    child.isChecked = true;
                }
            }
            indexArr.splice(indexArr.length - 1, 1);
            this.checkParent(folderList, indexArr);
        }
    };

    onClickCheckbox = (e, indexArr) => {
        const { checked } = e.target;
        let { folderArray } = this.state;
        const folder = this.findChild(folderArray, [...indexArr]);
        folder.isChecked = checked;
        if (folder.isFolder) {
            this.checkUnCheckChild(folder.subData, checked);
        }
        if (checked) {
            // this.checkParent(folderArray, [...indexArr]);
        } else {
            this.unCheckParent(folderArray, [...indexArr]);
        }
        this.setState({
            folderArray
        });
        const checkedFolder = [];
        this.setCheckedArray(folderArray, checkedFolder);
        this.setState({
            checkedFolder
        });
    };

    setCheckedArray = (folderArray, checkedArray) => {
        const length = folderArray.length;
        for (let i = 0; i < length; i++) {
            const folder = folderArray[i];
            if (folder.isChecked) {
                checkedArray.push(folder.id);
            }
            if (folder.isFolder) {
                this.setCheckedArray(folder.subData, checkedArray);
            }
        }
        return checkedArray;
    };

    renderTree = () => {
        const retData = [];
        const { folderArray } = this.state;
        const length = folderArray.length;
        for (let i = 0; i < length; i++) {
            const folder = folderArray[i];
            retData.push(this.renderFolder(folder, [i]));
        }
        return retData;
    }

    renderFolder = (folder, indexArr) => {
        const retData = [];
        const subFolders = folder.subData;
        const subFolderJSX = [];
        for (let j = 0; j < subFolders.length; j++) {
            const subFolder = subFolders[j];
            let subIndexArr = [];
            subIndexArr = [...indexArr, j];
            subFolderJSX.push(
                <tr key={v4()}>
                    <td>
                        {
                            !subFolder.isFolder &&
                            <React.Fragment>
                                <input type="checkbox" className="checkbox" checked={subFolder.isChecked} onClick={(e) => this.onClickCheckbox(e, [...subIndexArr])} />
                                <span>{subFolder.title}</span>
                            </React.Fragment>
                        }
                        {
                            subFolder.isFolder &&
                            this.renderFolder(subFolder, subIndexArr)
                        }
                    </td>
                </tr>
            );

        }
        retData.push(
            <div key={v4()}>
                <div className="general-heading">
                    <input type="checkbox" checked={folder.isChecked} className="checkbox" onClick={(e) => this.onClickCheckbox(e, [...indexArr])} />
                    <span onClick={() => this.onClickOpenSubFolderArr([...indexArr])}><img src={openFolderIcon} alt="" /></span>
                    <h4>{folder.title}</h4>
                </div>
                <Collapse isOpen={folder.isOpened}>
                    <div className="general-logs">
                        <div className="general-logs-inner">
                            <table className="data-table">
                                {subFolderJSX}
                            </table>
                        </div>
                    </div>
                </Collapse>
            </div>
        );
        return retData;
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }

    addToLibrary = () => {
        const { catalogId, checkedFolder, appName, dataSource } = this.state;
        if (checkedFolder.length === 0) {
            console.log("Please select one folder");
            this.setState({
                message: "Please select at least one folder for library location",
                isAlertOpen: true,
            });
            return;
        } else if (checkedFolder.length > 1) {
            console.log("Only one folder can be selected for library location");
            this.setState({
                message: "Only one folder can be selected for library location",
                isAlertOpen: true,
            });
            return;
        }
        if (!appName) {
            this.setState({
                message: "App name is mandatory. Please provide some value for app name",
                isAlertOpen: true,
            });
            return;
        }
        let obj = {
            collectorId: catalogId,
            folderIdList: checkedFolder,
            appName: appName,
            dataSource: dataSource === null ? "AWS" : dataSource
        }
        console.log("Object being added to library : ", obj);
    }

    render() {
        const state = this.state;
        return (
            <Modal isOpen={state.modal} className="" modalClassName="catalog-modal-container">
                <ModalHeader toggle={this.closeModel}>{this.state.catalogName}</ModalHeader>
                <ModalBody style={{ height: 'calc(60vh - 0px)', overflowY: 'auto', overflowX: "hidden" }}>
                    <div className="catalog-form-group">
                        <div className="form-group">
                            <label htmlFor="appName">App Name:</label>
                            <input type="text" placeholder="" name="appName" id="appName" value={state.appName} onChange={this.onChange} maxLength={255} className="input" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="selectDataSource">Select Data Source</label>
                            <select className="input select" name="dataSource" id="dataSource" value={state.dataSource} onChange={this.onChange}>
                                <option key="AWS" value="AWS">AWS</option>
                                <option key="AZURE" value="AZURE">AZURE</option>
                                <option key="GCP" value="GCP">GCP</option>
                                <option key="GCP" value="GCP">Synectiks</option>
                            </select>
                        </div>
                        <div className="library-group">
                            <label htmlFor="selectLocationInLibrary">Select location in Library</label>
                            {this.renderTree()}
                        </div>
                        <div className="form-group text-right">
                            <a className="gray-button" onClick={this.closeModel}>Cancel</a>
                            <a className="blue-button" onClick={this.addToLibrary}>Add to Library</a>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}

export default AddLibraryPopup;