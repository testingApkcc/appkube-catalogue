import React from 'react'
import { Modal, ModalBody } from 'reactstrap';

class AddCataloguePopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appName: null,
            dataSource: null,
            appDescription: null,
            isApiCalled: false,
            isAlertOpen: false,
            message: null,
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    closeModel = () => {
        this.setState({
            modal: !this.state.modal,
        });
    }


    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }

    addCatalog = () => {
        const { appName, dataSource, appDescription } = this.state;
        if (appName) {
            this.setState({
                message: "App name is mandatory. Please provide some value for app name",
                isAlertOpen: true,
            });
            return;
        }
        let obj = {
            appName: appName,
            dataSource: dataSource === null ? "AWS" : dataSource,
            appDescription: appDescription,
        }
        console.log("Object being added to library : ", obj);
    }

    render() {
        const state = this.state;
        return (
            <Modal isOpen={state.modal} className="" modalClassName="catalog-modal-container add-catalogue-container">
                <ModalBody style={{ height: 'calc(75vh - 110px)', overflowY: 'auto', overflowX: "hidden" }}>
                    <div className="catalog-form-group">
                        <div className="form-group">
                            <label htmlFor="appName">Catalog Name:</label>
                            <input type="text" placeholder="" name="appName" id="appName" value={state.appName} onChange={this.onChange} maxLength={255} className="input" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="selectDataSource">Catalog Type</label>
                            <select className="input select" name="dataSource" id="dataSource" value={state.dataSource} onChange={this.onChange}>
                                <option key="AWS" value="AWS">AWS</option>
                                <option key="AZURE" value="AZURE">AZURE</option>
                                <option key="GCP" value="GCP">GCP</option>
                                <option key="GCP" value="GCP">Synectiks</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="appName">Catalog Description:</label>
                            <textarea type="text" placeholder="" name="appDescription" id="appDescription" className="input textarea" value={state.appDescription} onChange={this.onChange}></textarea>
                        </div>
                        <div className="form-group text-right">
                            <a className="gray-button" onClick={this.closeModel}>Cancel</a>
                            <a className="blue-button" onClick={this.addCatalog}>Add Catalog</a>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}

export default AddCataloguePopup;