import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

class MultiSelect extends Component {
  state = {
    names: [],
    tags: [],
    selectedName: [],
    selectedTag: [],
  };

  componentDidMount() {
    axios
      .get('http://127.0.0.1:8000/projects/')
      .then((res) => {
        let optionName = [];
        let optionTag = [];
        res.data.map((a) => {
          if (a.name !== null) {
            optionName.push({ value: a.name, label: a.name });
          }
          // optionName.sort();
          if (a.tag !== null) {
            optionTag.push({ value: a.tag, label: a.tag });
          }
          return optionName;
        });

        this.setState({ names: optionName });
        this.setState({ tags: optionTag });
        console.log('Yo boi', this.state.names);
      })
      .catch((err) => console.log(err));
  }

  customTheme(theme) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: 'orange',
        primary: 'green',
      },
    };
  }

  handleNameChange = (selectedName) => {
    this.setState({ selectedName });
    let postName = [];
    if (selectedName) {
      selectedName.map((o) => {
        postName.push(o.value);
        console.log(postName);
        return postName;
      });
    }
  };
  handleTagChange = (selectedTag) => {
    this.setState({ selectedTag });
    let postTag = [];
    if (selectedTag) {
      selectedTag.map((o) => {
        postTag.push(o.value);
        console.log(postTag);
        return postTag;
      });
    }
  };
  render() {
    // const { selectedName, selectedTag } = this.state;
    return (
      <>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={this.state.names}
          placeholder='Name..'
          theme={this.customTheme}
          noOptionsMessage={() => 'Name not found 😞 '}
          onChange={this.handleNameChange}
          className='mb-3'
        />
        {/* {selectedName && selectedName.map((o) => <p>{o.value}</p>)} */}

        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          //   defaultValue={options}
          isMulti
          options={this.state.tags}
          placeholder='Tags..'
          theme={this.customTheme}
          // onChange={setName}
          onChange={this.handleTagChange}
          noOptionsMessage={() => 'Tag not found 😞 '}
          className='mb-3'
        />
        {/* {selectedTag && selectedTag.map((o) => <p>{o.value}</p>)} */}
      </>
    );
  }
}

export default MultiSelect;
