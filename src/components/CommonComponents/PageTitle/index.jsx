import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';
    
export default function PageTitle(props) {
  const { title } = props;
  return <h2 className={styles.pageTitle}>{title}</h2>;
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

