import React from 'react';
import { ScrollView, SafeAreaView, View, ActivityIndicator } from 'react-native';
import { Paragraph } from 'react-native-paper';

import AverageMoodChartContainer from '../containers/AverageMoodChartContainer';
import Checkin from './Checkin';
import ErrorBoundary from './ErrorBoundary';
import NoData from './NoData';
import SomethingWentWrong from './SomethingWentWrong';

const DEBUG = false;
class Insights extends React.Component {
  constructor(props) {
    super(props);
    this.renderCheckin = this.renderCheckin.bind(this);
  }

  renderCheckin(checkin) {
    const { hasErrored, isLoading, deleteId } = this.props;
    const deleteButtonDisabled = hasErrored || isLoading;
    return (
      <Checkin
        key={checkin.timestamp}
        checkin={checkin}
        deleteButtonDisabled={deleteButtonDisabled}
        onPressDelete={() => {
          if (!deleteButtonDisabled) deleteId(checkin.timestamp);
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
            <SafeAreaView style={{ flex: 1, borderWidth: DEBUG ? 4 : null, borderColor: 'orange' }}>
              <ErrorBoundary>
                <AverageMoodChartContainer checkins={checkins} />
              </ErrorBoundary>

              <View style={{ height: 20 }}>{isLoading && <ActivityIndicator />}</View>

              <Paragraph
                style={{ padding: 10, borderWidth: DEBUG ? 2 : null, borderColor: 'yellow' }}>
                Moods are ephemeral ⛅
              </Paragraph>

              <View
                style={{
                  paddingHorizontal: 6,
                  borderWidth: DEBUG ? 2 : null,
                  borderColor: 'yellow',
                }}>
                {checkins
                  .sort(function (a, b) {
                    return b.timestamp - a.timestamp;
                  })
                  .map((checkin) => this.renderCheckin(checkin))}
              </View>
            </SafeAreaView>
          </ScrollView>
        )
      );
    }

    return (
      <View
        style={{
          flex: 1,
          borderWidth: DEBUG ? 4 : null,
          borderColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <NoData isLoading={isLoading} />
      </View>
    );
  }
}

export default Insights;
