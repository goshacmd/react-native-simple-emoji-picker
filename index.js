import React from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import emoji from './data';

const EmojiItem = ({size, item, onPress}) => (
    <TouchableOpacity style={{flex: 0, height: size, width: size}} onPress={onPress}>
        <View style={{flex: 0, height: size, width: size}}>
            <Text style={{flex: 0, fontSize: size / 4 * 3, paddingBottom: 2}}>
                {item}
            </Text>
        </View>
    </TouchableOpacity>
);

const EmojiCategory = ({headerStyle, emojiSize, name, items, onPick, showHeader}) => (
    <View style={styles.category}>
        {
            showHeader &&
            <Text style={{...styles.categoryName, ...headerStyle}}>{name}</Text>
        }
        <View style={styles.categoryItems}>
            {items.map((em, idx) => (
                <EmojiItem key={idx} size={emojiSize} onPress={() => onPick(em)} item={em}/>
            ))}
        </View>
    </View>
);

const EmojiPicker = ({headerStyle, containerHeight, containerBackgroundColor, emojiSize, onPick, emojiCategories, showHeader}) => (
    <View style={{...styles.picker, height: containerHeight, backgroundColor: containerBackgroundColor}}>
        <ScrollView horizontal={true}>
            {
                emoji.map((category, idx) => {
                              return (
                                  (emojiCategories.indexOf(category.category) >= 0) &&
                                  <EmojiCategory
                                      key={idx}
                                      headerStyle={headerStyle}
                                      emojiSize={emojiSize}
                                      name={category.category}
                                      items={category.items}
                                      onPick={onPick}
                                      showHeader={showHeader}
                                  />

                              )
                                  ;
                          }
                )

            }
        </ScrollView>
    </View>
);

EmojiPicker.propTypes = {
    onPick                  : PropTypes.func,
    headerStyle             : PropTypes.object,
    containerHeight         : PropTypes.number.isRequired,
    containerBackgroundColor: PropTypes.string.isRequired,
    emojiSize               : PropTypes.number.isRequired,
    emojiCategories         : PropTypes.array,
    showHeader              : PropTypes.bool
};

EmojiPicker.defaultProps = {
    containerHeight         : 240,
    containerBackgroundColor: 'rgba(0, 0, 0, 0.1)',
    emojiSize               : 40,
    emojiCategories         : ['People', 'Nature', 'Foods', 'Activity', 'Places', 'Objects', 'Symbols', 'Flags'],
    showHeader              : true
};

const styles = {
    picker       : {
        flex          : 0,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
    },
    category     : {
        flex             : 0,
        paddingHorizontal: 14,
        paddingTop       : 2,
    },
    categoryName : {
        paddingVertical  : 8,
        paddingHorizontal: 4,
        fontSize         : 12,
        color            : "#888",
    },
    categoryItems: {
        flex    : 1,
        flexWrap: 'wrap',
    },
};

export default EmojiPicker;
