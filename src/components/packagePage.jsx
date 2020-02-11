import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import {getPackage} from '../services/packageService';

export default class PackagePage extends Component {
    state = {
        title: '',
        data:{title:'', section: '', installed_size: 0, dependencies:[], reverseDeps:[], description:''}
    }

    async populatePackage() {
        try {
            const title = this.props.match.params.title;
            const {data: Package} = await getPackage(title);
            this.setState({ data: this.mapToViewModel(Package) });
        } catch (ex) {
            if (ex.response && ex.response.status === 404) {
                this.props.history.replace('/not-found'); 
            }
        }

    }

    async componentDidMount() {
        await this.populatePackage();
    }

    mapToViewModel = Package => {
        return {
           _id: Package._id,
           title: Package.package,
           section: Package.section,
           installed_size: Package.installed_size,
           dependencies: Package.depends,
           reverseDeps: Package.reverseDeps,
           description: Package.description
        };
     }


     render() {
         const {title, section, installed_size, dependencies, reverseDeps, description} = this.state.data
         return (
           <div>
             <table className='table table-borderless'>
               <tbody>
                 <tr>
                   <th>Title:</th>
                   <td>{title}</td>
                 </tr>
                 <tr>
                   <th>Section:</th>
                   <td>{section}</td>
                 </tr>
                 <tr>
                   <th>Description</th>
                   <td>{description}</td>
                 </tr>
                 <tr>
                   <th>Installed-Size</th>
                   <td>{installed_size}</td>
                 </tr>
               </tbody>
             </table>
             <div className='row'>
               <div className='col-md-6'>
                 <table className='table table-borderless'>
                   <thead className='thead-dark'>
                     <tr>
                       <th>Requires ({dependencies.length})</th>
                     </tr>
                   </thead>
                   <tbody>
                     {dependencies.map(d => {
                       return (
                         <tr key={d}>
                           <td>
                             {d.map((p, i) => (
                               <span key={p}>
                                 {i < 1 ? '' : ' or '}{' '}
                                 <Link to={`/packages/${p}`}>{p}</Link>
                               </span>
                             ))}
                           </td>
                         </tr>
                       );
                     })}
                   </tbody>
                 </table>
               </div>
               <div className='col-md-6'>
                 <table className='table table-borderless'>
                   <thead className='thead-dark'>
                     <tr>
                       <th>Required by ({reverseDeps.length})</th>
                     </tr>
                   </thead>
                   <tbody>
                     {reverseDeps.map(d => {
                       return (
                         <tr key={d}>
                           <td>
                             <Link to={`/packages/${d}`}>{d}</Link>
                           </td>
                         </tr>
                       );
                     })}
                   </tbody>
                 </table>
               </div>
             </div>
           </div>
         );
     }
}