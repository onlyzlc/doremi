import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import IconButton from './components/IconButton'
import Button from './components/Button'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage"

const roll = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si']

function Question({ note, showAnswer }) {
  return <View style={styles.note}>
    <Text style={{ fontSize: 200, fontWeight: 700, textAlign: 'center' }}>{note}</Text>
    {showAnswer &&
      <Text style={{ fontSize: 48, fontWeight: 200, textAlign: 'center' }}>{roll[note - 1]}</Text>
    }
  </View>
}

export default function App() {
  const totalCount = 10

  // 音符组
  const [noteGroup, setNoteGroup] = useState([])
  const [exerciseLength, setExerciseLength] = useState(totalCount - 1)
  // 启动状态
  const [practiceStatus, setPracticeStatus] = useState('setting')
  // 回答超时
  const [isTimeout, setIsTimeout] = useState(false)
  // 当前数字
  const [note, setNote] = useState(null)
  // 是否禁麦
  const [curfew, setCurfew] = useState(true)

  // 随机生成一组不重复的音符
  const generateGroup = (length = 3) => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    let newArr = []
    for (let i = 0; i < length; i++) {
      // 从1~7中随机取出一个加入到新数组中
      newArr = newArr.concat(arr.splice(Math.floor(Math.random() * (7 - i)), 1))
    }
    return newArr
  }
  // 读取存储
  if(noteGroup.length === 0){
    // 教训：更新状态一定要有事件或条件，否则将死循环（因为每次更新状态都会触发所在组件重新执行和渲染）
    AsyncStorage.getItem('lastStatus')
      .then((value) => {
        if(value != null ){
          // 按上一次练习的音符组数量重新生成一组音符
          const l = JSON.parse(value).noteGroup.length
          setNoteGroup(generateGroup(l))
        }else{
          setNoteGroup([1,4,7])
        }
      })
      .catch((e) => console.error(e))
  }
  
  const addNote = () => setNoteGroup(generateGroup(noteGroup.length + 1))
  const subtractNote = () => setNoteGroup(generateGroup(noteGroup.length - 1))
  const changeNotes = () => setNoteGroup(generateGroup(noteGroup.length))
  // 从音符组中随机取一个
  const getOneNote = () => noteGroup[Math.floor(Math.random() * noteGroup.length)]
  // 启动训练
  const practice = () => {
    setNote(getOneNote())
    setExerciseLength(totalCount - 1)
    setPracticeStatus('practicing')
    // 存储
    AsyncStorage.setItem('lastStatus', JSON.stringify({ noteGroup: noteGroup }))
      .catch(e => console.error(e))
  }

  const setNextNumber = () => {
    setIsTimeout(false)
    if (exerciseLength > 0) {
      // 如果没有练完,就计算下一个音符
      setNote(getOneNote())
      setExerciseLength(exerciseLength - 1)
    } else {
      // 如果练完了,就显示完成图标,短暂停留后自动跳回设置页面
      setPracticeStatus('done')
      setTimeout(() => {
        setPracticeStatus('setting')
      }, 800);

      changeNotes()
    }
  }

  const exit = () => {
    setIsTimeout(false)
    setExerciseLength(totalCount)
    setPracticeStatus('setting')
  }

  // 音符组展示JSX
  const notesList = noteGroup.map(note =>
    <View key={note} style={styles.note}>
      <Text style={{ fontSize: 32, fontWeight: 700, textAlign: 'center' }}>{note}</Text>
      <Text style={{ fontSize: 16, fontWeight: 200, textAlign: 'center' }}>{roll[note - 1]}</Text>
    </View>)

  return (
    <View style={[styles.container, { paddingTop: 64 }]}>
      {/* 未启动 */}
      {practiceStatus == 'setting' &&
        <View style={styles.content}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>唱名训练</Text>
          </View>
          {/* 音符展示区 */}
          <View style={styles.topic}>
            <View style={styles.notesList}>
              {notesList}
            </View>
            {/* 控制按钮 */}
            <View style={styles.controlBar}>
              <IconButton onPress={addNote} disabled={noteGroup.length >= 7} name="add" label="增加" size={64} />
              <IconButton onPress={subtractNote} disabled={noteGroup.length <= 3} name="remove" label="减少" size={64} />
              <IconButton onPress={changeNotes} disabled={noteGroup.length == 7} name="refresh" label="换一组" size={64} />
            </View>
          </View>
          {/* 启动按钮 */}
          <View style={styles.entrance}>
            <Button label='练习' theme='primary' onPress={practice} />
          </View>
        </View>}
      {/* 启动后 */}
      {practiceStatus == 'practicing' &&
        <View style={styles.content}>
          {/* 顶部栏进度条、关闭按钮 */}
          <View style={styles.titleBar}>
            <Text style={styles.title}>{totalCount - exerciseLength}/{totalCount}</Text>
            <IconButton name='close' size={64} onPress={exit} />
          </View>

          {/* 音符展示区 */}
          <View style={styles.topic}>
            <Question note={note} showAnswer={isTimeout} />
          </View>

          {/* 语音识别结果展示 */}
          {curfew ?
            <View style={styles.heard}>
              <Button label='下一个' onPress={setNextNumber}></Button>
            </View>
            :
            <View style={styles.heard}>
              <Text style={{ fontSize: 48, fontWeight: 300, textAlign: 'center' }}>请唱...</Text>
            </View>
          }
        </View>}

      {/* 完成 */}
      {practiceStatus == 'done' &&
        <View style={styles.content}>
          <MaterialIcons name='check-circle-outline' size={128} style={{ color: '#44D7B6' }} />
        </View>}
      <StatusBar style="auto" hidden={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: '#fff',
    maxWidth: "600px",
  },
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 48,
    flex: 1,
  },
  titleBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 16
  },
  title: {
    color: "rgb(51, 51, 51)",
    fontSize: 32,
    fontWeight: 700,
    textAlign: "left",
    flex: 1
  },
  topic: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px",
    flex: "none",
    alignSelf: "stretch",
    flexGrow: 1,
    marginVertical: 16
  },
  notesList: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 16,
    flex: "none",
    flexGrow: 0,
    // marginVertical: 50,
    paddingHorizontal: 16,
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: "rgb(168, 227, 215)",
    borderTopColor: "rgb(168, 227, 215)",
    backgroundColor: "rgb(229, 249, 245)"
  },
  note: {
    // width: 60,
    // height: 80,
    flex: 'auto'
  },
  controlBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
  },
  entrance: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heard: {

  }
});
