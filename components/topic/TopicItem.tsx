import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import dayjs from 'dayjs'
import { compact } from 'lodash-es'
import { memo } from 'react'
import { Pressable, Text, View } from 'react-native'

import { useTopicDetail } from '@/servicies/topic'
import { Topic } from '@/servicies/types'
import { RootStackParamList } from '@/types'
import tw from '@/utils/tw'

import Separator from '../Separator'
import Space from '../Space'
import StyledButton from '../StyledButton'
import StyledImage from '../StyledImage'

export interface TopicItemProps {
  topic: Topic
  hideAvatar?: boolean
  isDisabledPress?: () => boolean
}

export default memo(TopicItem)

function TopicItem({ topic, hideAvatar, isDisabledPress }: TopicItemProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const { isFetched } = useTopicDetail({
    variables: { id: topic.id },
    enabled: false,
  })

  return (
    <Pressable
      style={({ pressed }) =>
        tw.style(
          `px-4 py-3 flex-row border-b border-solid border-tint-border bg-body-1`,
          pressed && !isDisabledPress?.() && 'bg-message-press'
        )
      }
      onPress={() => {
        if (isDisabledPress?.()) return
        navigation.push('TopicDetail', { id: topic.id })
      }}
    >
      {!hideAvatar && (
        <View style={tw`mr-3`}>
          <Pressable
            onPress={() => {
              if (isDisabledPress?.()) return
              navigation.push('MemberDetail', {
                username: topic.member?.username!,
              })
            }}
          >
            <StyledImage
              style={tw`w-12 h-12 rounded-full`}
              source={{
                uri: topic.member?.avatar,
              }}
            />
          </Pressable>
        </View>
      )}
      <View style={tw`flex-1`}>
        <Space style={tw`items-center`}>
          {!!topic.node?.title && (
            <StyledButton
              size="mini"
              type="primary"
              onPress={() => {
                navigation.push('NodeTopics', { name: topic.node?.name! })
              }}
            >
              {topic.node?.title}
            </StyledButton>
          )}
          <Text
            style={tw`text-tint-primary text-body-5 font-bold flex-1`}
            numberOfLines={1}
          >
            {topic.member?.username}
          </Text>
        </Space>

        <Separator style={tw`mt-1`}>
          {compact([
            !!topic.votes && (
              <Text key="votes" style={tw`text-tint-secondary text-body-5`}>
                {`${topic.votes} 赞同`}
              </Text>
            ),
            !!topic.reply_count && (
              <Text key="replies" style={tw`text-tint-secondary text-body-5`}>
                {`${topic.reply_count} 回复`}
              </Text>
            ),
            <Text
              key="last_touched"
              style={tw`text-tint-secondary text-body-5`}
            >
              {dayjs(topic.last_touched).fromNow()}
            </Text>,
            !!topic.last_reply_by && (
              <Text
                key="last_reply_by"
                style={tw`text-tint-primary text-body-5 flex-1`}
                numberOfLines={1}
              >
                <Text style={tw`text-tint-secondary text-body-5`}>
                  最后回复于
                </Text>
                {topic.last_reply_by}
              </Text>
            ),
          ])}
        </Separator>

        <Text
          style={tw.style(
            `text-body-5 pt-2`,
            isFetched ? `text-tint-secondary` : `text-tint-primary`
          )}
        >
          {topic.title}
        </Text>
      </View>
    </Pressable>
  )
}
