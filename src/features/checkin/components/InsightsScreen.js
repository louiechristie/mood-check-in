import React from 'react';
import { ScrollView, View, SafeAreaView, ActivityIndicator } from 'react-native';
import AverageMoodChartContainer from '../containers/AverageMoodChartContainer';
import Checkin from './Checkin';
import ErrorBoundary from './ErrorBoundary';
import SomethingWentWrong from './SomethingWentWrong';
import NoData from './NoData';

class Insights extends React.Component {
  constructor(props) {
    super(props);
    this.renderCheckin = this.renderCheckin.bind(this);
  }

  // renderDeleteAllButton() {
  //   return (
  //     <Button
  //       title="DeleteAll"
  //       onPress={() => this.props.deleteMultiple(this.props.checkins.map(({ id }) => id))}
  //     />
  //   );
  // }

  renderCheckin(checkin) {
    const { hasErrored, isLoading } = this.props;
    const deleteButtonDisabled = hasErrored || isLoading;
    return (
      <Checkin
        key={checkin.id}
        checkin={checkin}
        deleteButtonDisabled={deleteButtonDisabled}
        onPressDelete={() => {
          if (!deleteButtonDisabled) this.props.delete(checkin.id);
        }}
      />
    );
  }

  render() {
    const { checkins, isLoading, hasErrored } = this.props;

    if (hasErrored) {
      return <SomethingWentWrong />;
    }

    if (checkins && checkins.length > 0) {
      return (
        checkins && (
          <ScrollView>
            <SafeAreaView style={{ flex: 1 }}>
              <ErrorBoundary>
                <AverageMoodChartContainer checkins={checkins} />
              </ErrorBoundary>

              <View style={{ height: 20 }}>{isLoading && <ActivityIndicator />}</View>

              <View style={{ paddingHorizontal: 6 }}>
                {checkins
                  .sort(function(a, b) {
                    return b.timestamp - a.timestamp;
                  })
                  .map(checkin => this.renderCheckin(checkin))}
              </View>
            </SafeAreaView>
          </ScrollView>
        )
      );
    }

    return (
      <View>
        <NoData isLoading={isLoading} />
      </View>
    );
  }
}

export default Insights;
