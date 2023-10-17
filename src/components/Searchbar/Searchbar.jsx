import React from 'react';
import { toast } from 'react-toastify';
import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { GrSearch } from 'react-icons/gr';
// import PropTypes from 'prop-types';

export const Searchbar = ({ onSearchForm }) => {
  const onSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = form.elements.query.value.trim();
    onSearchForm(query);
    form.elements.query.value = '';
    if (query === '') {
      toast.warning(`It is hard to search with such little information`);
      return;
    }
  };
  return (
    <>
      <SearchForm onSubmit={onSubmit}>
        <SearchFormButton type="submit">
          <GrSearch style={{ width: '2em', height: '2em' }} />
        </SearchFormButton>
        <SearchFormInput
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </>
  );
};
                 
        