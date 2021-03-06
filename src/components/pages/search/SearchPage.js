import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

import { AuthorCard } from './components/author-card';
import { Searchbar } from './components/searchbar';
import { Parallax } from '@core/parallax';
import { AuthorsList, PageContainer } from './SearchPage.styles';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorsArray: [],
      searchOptions: [
        { value: 'name', label: props.t('controls:name') },
        { value: 'spawnPoint', label: props.t('controls:city') },
      ],
      currentSearchOption: null,
      authorsList: null,
      currentLanguage: i18n.language,
    }
    this.onSearchOptionChange = this.onSearchOptionChange.bind(this);
    this.onAuthorsSearchChange = this.onAuthorsSearchChange.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { t } = props;
    const currentLanguage = i18n.language
    const authorsArray = t('authors:authors');
    if (state.currentLanguage !== currentLanguage) {
      const searchOptions=[
        { value: 'spawnPoint', label: props.t('controls:city') },
        { value: 'name', label: props.t('controls:name') },
      ];
      return { searchOptions: searchOptions, authorsArray: authorsArray }
    }     
    if (authorsArray !== state.authorsArray) {
      return { authorsArray: authorsArray }
    }
    return null;
  }

  onSearchOptionChange(value) {
    this.setState({ searchOption: value })
  }

  onAuthorsSearchChange(arr) {
    this.setState({ authorsList: arr })
  }

  render() {
    const authors = this.state.authorsList || this.state.authorsArray;
    const searchOption = this.state.currentSearchOption || this.state.searchOptions[0]; 
    return (
      <PageContainer>
        <Parallax />
        <Searchbar
          authorsList={this.state.authorsArray}
          searchOption={searchOption}
          searchOptions={this.state.searchOptions}
          onSearchOptionChange={this.onSearchOptionChange}
          onAuthorsSearchChange={this.onAuthorsSearchChange}
          label={this.props.t('controls:searchBy')}
        />
        <AuthorsList>{
          authors.map(author =>
            <li key={author.id} >
              <Link to={`/author/${author.id}`} >
                <AuthorCard
                  photo={author.selfie}
                  city={author.spawnPoint}
                  name={author.name}
                />
              </Link>
            </li>)
        }
        </AuthorsList>
      </PageContainer>
    )
  }
}

export default withTranslation()(SearchPage);