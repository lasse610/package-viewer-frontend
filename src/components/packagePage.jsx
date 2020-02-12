import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getPackage } from "../services/packageService";
import DependencyTable from "./packageInfoPage/dependencyTable";
import PackageInfoTable from "./packageInfoPage/packageInfoTable";

export default class PackagePage extends Component {
  state = {
    title: "",
    data: {
      title: "",
      section: "",
      installed_size: 0,
      dependencies: [],
      reverseDeps: [],
      description: ""
    }
  };

  async populatePackage() {
    try {
      const title = this.props.match.params.title;
      const { data: Package } = await getPackage(title);
      this.setState({ data: this.mapToViewModel(Package) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
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
  };
  // Dependencies are stored in [[String]] and need to be maped twice because of possibility for optional dependencies.
  handleDependencies = deps => {
    return deps.map(d => (
      <tr key={d}>
        <td>
          {d.map((p, i) => (
            <span key={p}>
              {i < 1 ? "" : " or "} <Link to={`/packages/${p}`}>{p}</Link>
            </span>
          ))}
        </td>
      </tr>
    ));
  };
  //[String]
  handleRevDeps = deps => {
    return deps.map(d => (
      <tr key={d}>
        <td>
          <Link to={`/packages/${d}`}>{d}</Link>
        </td>
      </tr>
    ));
  };

  render() {
    const {
      title,
      section,
      installed_size,
      dependencies,
      reverseDeps,
      description
    } = this.state.data;
    return (
      <div>
        <PackageInfoTable
          title={title}
          section={section}
          installed_size={installed_size}
          description={description}
        />
        <div className="row">
          <DependencyTable
            text={`Requires (${dependencies.length})`}
            body={this.handleDependencies(dependencies)}
          />
          <DependencyTable
            text={`Required by (${reverseDeps.length})`}
            body={this.handleRevDeps(reverseDeps)}
          />
        </div>
      </div>
    );
  }
}
