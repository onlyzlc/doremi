import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import IconButton from './components/IconButton'
import Button from './components/Button'
import MaterialIcons  from "@expo/vector-icons/MaterialIcons";

const roll = ['do', 're', 'mi', 'fa', 'sol', 'la', 'ti']

function Question({ number, showAnswer }) {
  return <View style={styles.note}>
    <Text style={{ fontSize: 200, fontWeight: 700, textAlign: 'center' }}>{number}</Text>
    {showAnswer &&
      <Text style={{ fontSize: 48, fontWeight: 200, textAlign: 'center' }}>{roll[number - 1]}</Text>
    }
  </View>
}

export default function App() {
  const totalCount = 10
  // 当前训练数字组长度
  const [numberOfNotes, setNumberOfNotes] = useState(3)
  // 当前入选数字
  const [numbers, setNumbers] = useState([1,  4,  7])
  const [questionCount, setQuestionCount] = useState(totalCount-1)
  // 启动状态
  const [practiceStatus, setPracticeStatus] = useState('setting')
  // 回答超时
  const [isTimeout, setIsTimeout] = useState(false)
  // 当前数字
  const [number, setNumber] = useState(getOneNumber())
  // 是否禁麦
  const [curfew, setCurfew] = useState(true)

  const onAddNote = () => {  }
  const onSubtract = () => { }
  const onChangeNotes = () => { }
  // 启动训练
  const practice = () => { 
    setNumber(getOneNumber())
    setQuestionCount(totalCount-1)
    setPracticeStatus('practicing') 
  }

  // 从入选数字中随机取一个
  function getOneNumber(){
    return numbers[Math.floor(Math.random() * numberOfNotes)]
  }
  
  const setNextNumber = () => {
    setIsTimeout(false)
    if (questionCount > 0) {
      // const n = getOneNumber()
      setNumber(getOneNumber())
      setQuestionCount(questionCount - 1)
    } else{
      setPracticeStatus('done')
      setIsTimeout(false)
      setTimeout(() => {
        setPracticeStatus('setting')
      }, 800);
    }
  }

  const exit = () => {
    setIsTimeout(false)
    setQuestionCount(totalCount)
    setPracticeStatus('setting')
  }

  // 音符组展示JSX
  const notesList = numbers.map(number =>
    <View key={number} style={styles.note}>
      <Text style={{ fontSize: 32, fontWeight: 700, textAlign: 'center' }}>{number}</Text>
      <Text style={{ fontSize: 16, fontWeight: 200, textAlign: 'center' }}>{roll[number - 1]}</Text>
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
              <IconButton onPress={onAddNote} name="add" label="增加" size={64} />
              <IconButton onPress={onSubtract} name="remove" label="减少" size={64} />
              <IconButton onPress={onChangeNotes} name="refresh" label="换一组" size={64} />
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
            <Text style={styles.title}>{totalCount - questionCount}/{totalCount}</Text>
            <IconButton name='close' size={64} onPress={exit} />
          </View>

          {/* 音符展示区 */}
          <View style={styles.topic}>
            <Question number={number} showAnswer={isTimeout} />
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
          <MaterialIcons name='check-circle-outline' size={128} style={{color:'#44D7B6'}} />
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
