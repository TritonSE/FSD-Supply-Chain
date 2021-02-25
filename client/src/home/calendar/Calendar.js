import React, { Component } from 'react';
import moment from 'moment';

import Timeline, { TimelineMarkers, CustomMarker, TimelineHeaders, DateHeader, CustomHeader } from 'react-calendar-timeline';
import containerResizeDetector from 'react-calendar-timeline/lib/resize-detector/container';

import 'react-calendar-timeline/lib/Timeline.css';
import './Calendar.scss';

class Calendar extends Component {
  /**
   * Convert an ISO 8601 date string into month/day format (e.g. 2/27).
   */
  static formatDate(date) {
    return date.replace(/^\d+-0?(\d+)-0?(\d+)T.*$/, "$1/$2");
  }

  /**
   * Create a moment in the local timezone which copies the year, month, and day
   * from an ISO 8601 date string.
   */
  static localMoment(date) {
    return moment(date.slice(0, "YYYY-MM-DD".length));
  }

  /**
   * Combine the item and batch IDs.
   */
  static combineIds(itemId, batchId) {
    return itemId + "+" + batchId;
  }

  /**
   * Split a combined item and batch ID.
   */
  static splitId(combinedId) {
    return combinedId.split("+");
  }

  /**
   * Generate an uppercased title for an item.
   */
  static shortTitle(item) {
    return item.name.slice(0, 1).toUpperCase() + item.name.slice(1);
  }

  /**
   * Generate an uppercased title for an item which also shows the number of batches.
   */
  static longTitle(item) {
    return `${Calendar.shortTitle(item)} (${item.batches.length})`
  }

  constructor() {
    super();
    this.state = {
      expanded: {}
    };
  }

  makeTimelineItems = (item) => {
    const timelineItems = [];

    if (this.state.expanded[item._id]) {
      timelineItems.push({
        id: item._id,
        group: item._id,
        title: Calendar.longTitle(item),
        start_time: Calendar.localMoment(item.batches[0].inDate),
        end_time: Calendar.localMoment(item.batches[item.batches.length - 1].outDate).endOf("day"),
      })
    }

    for (let i = 0; i < item.batches.length; i++) {
      const batch = item.batches[i];

      timelineItems.push({
        // Incorporate the item ID into the timeline ID, so it can be used in the
        // timeline item's click handler to toggle the expanded view for the item.
        id: Calendar.combineIds(item._id, batch._id),
        // Render the timeline item in its own group if expanded, and the shared group otherwise.
        group: this.state.expanded[item._id] ? Calendar.combineIds(item._id, batch._id) : item._id,
        title: this.state.expanded[item._id]
          ? Calendar.shortTitle(item)
          : (i == 0 ? Calendar.longTitle(item) : ""),
        right: Calendar.formatDate(batch.outDate),
        start_time: Calendar.localMoment(batch.inDate),
        // Make the end time reach the end of the day on the calendar.
        end_time: Calendar.localMoment(batch.outDate).endOf("day"),
      });
    }

    timelineItems.reverse();

    return timelineItems;
  }

  makeTimelineGroups = (item) => {
    const timelineGroups = [
      {
        id: item._id,
        title: item.name,
      }
    ];

    if (this.state.expanded[item._id]) {
      for (const batch of item.batches) {
        timelineGroups.push({
          id: Calendar.combineIds(item._id, batch._id),
          title: batch.batchId, // TODO
        });
      }
    }

    return timelineGroups;
  }

  timelineItemClickHandler = (combinedId, e, time) => {
    const itemId = Calendar.splitId(combinedId)[0];
    const expanded = Object.assign({}, this.state.expanded);
    expanded[itemId] = !expanded[itemId];
    this.setState({ expanded });
  }

  render = () => {
    const visibleItems = this.props.items.filter((item) => item.batches.length > 0);
    const timelineGroups = visibleItems.map(this.makeTimelineGroups).flat();
    const timelineItems = visibleItems.map(this.makeTimelineItems).flat();
    const noon = moment().startOf("day").add(12, "hour");

    return (<Timeline
      groups={timelineGroups}
      items={timelineItems}
      canMove={false}
      canChangeGroup={false}
      canResize={false}
      itemTouchSendsClick={true}
      selected={[]}
      itemHeightRatio={1}
      resizeDetector={containerResizeDetector}
      visibleTimeStart={+moment().startOf('month')}
      visibleTimeEnd={+moment().endOf('month')}
      onItemSelect={this.timelineItemClickHandler}
      itemRenderer={(props) => <TimelineItem {...props}/>}
    >
      <TimelineHeaders>
        <DateHeader unit="primaryHeader" />
        <CustomHeader unit="day" className="rct-dateHeader">
          {({ headerContext: { intervals }, getRootProps, getIntervalProps }) => {
            return (
              <div {...getRootProps()}>
                {intervals.map((interval) => {
                  let className = "rct-dateHeaderInterval";
                  if (interval.startTime < noon && noon < interval.endTime) {
                    className += " rct-dateHeaderIntervalToday";
                  }
                  return (
                    <div {...getIntervalProps({interval, style: {height: "100%"}})}>
                      <div className={className}>
                        {interval.startTime.format("D")}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          }}
        </CustomHeader>
      </TimelineHeaders>
      <TimelineMarkers>
        {/* TODO: refresh periodically, in case the page is left open for multiple days */}
        <CustomMarker date={noon} style={{zIndex: 100}}>
          {({ styles }) => (
            <div style={{...styles, zIndex: 100, width: "1px"}} />
          )}
        </CustomMarker>
      </TimelineMarkers>
    </Timeline>);
  }
}

function TimelineItem(props) {
  return (
    <div {...props.getItemProps(props.item)}>
      <div className="rct-item-content">
        <div className="rct-item-right">
          {props.item.right}
        </div>
        <div className="rct-item-title">
          {props.item.title}
        </div>
      </div>
    </div>
  );
}

export default Calendar;