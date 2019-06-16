import React from 'react';
import { connect } from 'react-redux';
import { View, Platform } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Appbar, Portal, Modal, Drawer, Surface } from 'react-native-paper';
import { checkinsFetchData, checkinsDelete } from '../actions/checkins';
import InsightsScreen from '../components/InsightsScreen';
import ErrorBoundary from '../components/ErrorBoundary';
import Colors from '../../../constants/Colors';

const MORE_ICON = Platform.OS === 'ios' ? 'more-horiz' : 'more-vert';

class InsightsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Insights',
      header: (
        <Appbar.Header dark>
          <Appbar.Content title="Insights" />
          {__DEV__ && (
            <Appbar.Action icon={MORE_ICON} onPress={navigation.getParam('toggleModal')} />
          )}
        </Appbar.Header>
      ),
    };
  };

  componentDidMount() {
    this.props.fetchData();
    this.props.navigation.setParams({ toggleModal: this.toggleModal });
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  deleteAll = () => {
    const { checkins, deleteId } = this.props;

    console.log('Delete all button pressed');
    for (const checkin of checkins) {
      console.log('delete id: ', checkin.id);
      deleteId(checkin.id);
    }
  };

  render() {
    const { showModal } = this.state;
    return (
      <ErrorBoundary>
        <View>
          <NavigationEvents onDidFocus={this.props.fetchData} />
          <InsightsScreen {...this.props} />
          <Portal>
            <Modal visible={showModal} onDismiss={this.toggleModal}>
              <Surface
                style={{
                  surface: {
                    margin: 8,
                    padding: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation: 4,
                  },
                }}>
                <Drawer.Section title="More options" />
                <Drawer.Item
                  style={{ color: Colors.warningText }}
                  label="Delete all"
                  onPress={() => {
                    this.deleteAll();
                    this.toggleModal();
                  }}
                  icon="delete"
                />
              </Surface>
            </Modal>
          </Portal>
        </View>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => {
  return {
    checkins: state.checkins,
    hasErrored: state.checkinsHasErrored,
    isLoading: state.checkinsIsLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(checkinsFetchData()),
    deleteId: id => dispatch(checkinsDelete(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsightsContainer);
