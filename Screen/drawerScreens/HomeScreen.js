import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  StatusBar
} from "react-native";
import { Avatar, ListItem, SearchBar } from "react-native-elements";
import _ from "lodash";
import { getUsers, contains } from "../../api/index";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      searchText: "",
      query: "",
      fullData: []
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    // makeRemoteRequest = _.debounce( () => {
    this.setState({ loading: true });

    getUsers(20, this.state.query)
      .then(users => {
        this.setState({
          loading: false,
          data: users,
          fullData: users       // una copia de todos los usuarios
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
    // }, );
  };

  handleSearch = (text) => {
    // console.log(text)
    this.setState({ searchText: text });
    const formatQuery = text.toLowerCase();
    const data = _.filter(this.state.fullData, user => {    // Busca en los usuarios y retorna solo la vista de ese usuario
      return contains(user, formatQuery)
    })
    this.setState({ query: formatQuery, data })
    // this.setState({ query: formatQuery, data }, () => this.makeRemoteRequest())

  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Buscar aqui..." lightTheme round onChangeText={this.handleSearch} value={this.state.searchText} />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  keyExtractor = (item, index) => index.toString()    // No la uso aun

  renderItem = ({ item }) => (
    <ListItem bottomDivider onPress={() => this.onPressItem(item)}> 
      <Avatar source={{ uri: item.picture.thumbnail }} />
      <ListItem.Content>
        <ListItem.Title>{`${item.name.first} ${item.name.last}`}</ListItem.Title>
        <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  )

  onPressItem = (item) => {
    console.log(item)
  }
  render() {
    return (
      <SafeAreaView>

        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
        />

      </SafeAreaView>
    );
  }
}

export default HomeScreen;

