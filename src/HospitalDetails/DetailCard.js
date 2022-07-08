import React from 'react';
import { TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

function DetailCard({ onPress, children }) {
  return (
    <TouchableHighlight
      style={{ borderRadius: 10, marginTop: 20 }}
      onPress={onPress}
      underlayColor="#DDDDDD"
    >
      {children}
    </TouchableHighlight>
  );
}

DetailCard.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default DetailCard;
