import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImgGallery/ImageGallery';
import { fetchImages } from '../api';
import { toast } from 'react-toastify';
import { LargeImg, Wrapper } from './App.styled';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    per_page: 12,
    totalHits: 0,
    loading: false,
    largeImageURL: '',
    isOpen: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page, per_page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ loading: true });
        const { totalHits, hits } = await fetchImages({
          q: query,
          page,
          per_page,
        });
        if (query === prevState.query) {
          toast.success(
            `Hooray! We found ${totalHits - this.state.images.length} images.`
          );
        }

        if (!totalHits) {
          toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        this.setState(prev => ({
          page,
          images: [...prev.images, ...hits],
          totalHits,
        }));
      } catch (error) {
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handlerSearchForm = query => {
    if (query !== this.state.query) {
      this.setState({
        query: query,
        page: 1,
        images: [],
      });
    }
  };

  handleLoadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  handleClickImage = largeImageURL => {
    this.setState({
      largeImageURL: largeImageURL,
      isOpen: true,
    });
  };

  toggleModal = () =>
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));

  render() {
    const { images, loading, totalHits, largeImageURL, isOpen } = this.state;
    return (
      <Wrapper>
        <Searchbar onSearchForm={this.handlerSearchForm} />
        {images.length > 0 && (
          <ImageGallery images={images} onClickImage={this.handleClickImage} />
        )}
        {loading && <Loader />}

        {isOpen && (
          <Modal onClose={this.toggleModal}>
            <LargeImg src={largeImageURL} alt="" />
          </Modal>
        )}

        {!loading && images.length > 0 && images.length < totalHits && (
          <Button onLoadMore={this.handleLoadMoreBtn} />
        )}
      </Wrapper>
    );
  }
}
