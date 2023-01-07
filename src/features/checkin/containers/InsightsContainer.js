import React from 'react';
import { View, Platform } from 'react-native';
import { Appbar, Portal, Modal, Drawer, Surface } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';

import Colors from '../../../constants/Colors';
import { checkinsDelete } from '../actions/checkins';
import ErrorBoundary from '../components/ErrorBoundary';
import InsightsScreen from '../components/InsightsScreen';

const DEBUG = false;

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

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
      header: () => (
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
    this.props.navigation.setParams({ toggleModal: this.toggleModal });
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  deleteAll = () => {
    const { checkins, deleteId } = this.props;

    DEBUG && console.log('Delete all button pressed');
    for (const checkin of checkins) {
      DEBUG && console.log('delete timestamp: ', checkin.timestamp);
      deleteId(checkin.timestamp);
    }
  };

  render() {
    const { showModal } = this.state;
    return (
      <ErrorBoundary>
        <View style={{ flex: 1, borderWidth: DEBUG ? 8 : null, borderColor: 'red' }}>
          <NavigationEvents />
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

const mapStateToProps = (state) => {
  return {
    checkins: state.checkins,
    hasErrored: state.checkinsHasErrored,
    isLoading: state.checkinsIsLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteId: (timestamp) => dispatch(checkinsDelete(timestamp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InsightsContainer);
