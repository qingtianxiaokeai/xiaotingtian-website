import type { Skill, TimelineItem } from '@/types'

export const skills: Skill[] = [
  { name: '数据标注 & 清洗', icon: '🏷️', category: 'AI 数据训练', level: 92, description: '高质量数据标注与清洗，服务于大模型训练流程' },
  { name: 'Prompt Engineering', icon: '🤖', category: 'AI 数据训练', level: 88, description: '精准设计提示词，优化模型输出质量与对齐效果' },
  { name: '模型评估 & RLHF', icon: '📊', category: 'AI 数据训练', level: 85, description: '基于人类反馈的强化学习数据生产与质量把控' },
  { name: 'Python', icon: '🐍', category: 'AI 数据训练', level: 80, description: '数据处理脚本、自动化标注流程与批量分析' },
  { name: '电路设计', icon: '⚡', category: '电气工程', level: 88, description: '模拟与数字电路设计，原理图绘制与分析' },
  { name: 'PCB 设计', icon: '🔌', category: '电气工程', level: 82, description: '使用 EDA 工具进行 PCB 布局布线与制板' },
  { name: '电气系统分析', icon: '🔬', category: '电气工程', level: 85, description: '电力系统仿真、故障诊断与参数优化' },
  { name: 'AutoCAD / EDA', icon: '📐', category: '电气工程', level: 78, description: 'Altium Designer / KiCad 等 EDA 工具使用' },
  { name: 'Arduino / ESP32', icon: '🛠️', category: '嵌入式 & 单片机', level: 90, description: '快速原型开发，物联网设备与传感器集成' },
  { name: 'STM32 / ARM', icon: '💡', category: '嵌入式 & 单片机', level: 85, description: 'HAL 库开发，RTOS 任务调度与外设驱动编写' },
  { name: 'C / C++', icon: '⚙️', category: '嵌入式 & 单片机', level: 88, description: '嵌入式底层编程，内存管理与实时控制逻辑' },
  { name: '硬件调试 & 焊接', icon: '🔧', category: '嵌入式 & 单片机', level: 82, description: '示波器、逻辑分析仪调试，SMD 精细焊接' },
  { name: '视频创作 & 剪辑', icon: '🎬', category: '创意内容', level: 85, description: '科技类内容脚本、拍摄与后期剪辑制作' },
  { name: '内容策划', icon: '✍️', category: '创意内容', level: 88, description: '技术科普与创意选题，构建有价值的内容矩阵' },
  { name: '图像 & 平面设计', icon: '🎨', category: '创意内容', level: 75, description: '封面设计、信息图表与品牌视觉表达' },
]

export const timeline: TimelineItem[] = [
  {
    year: '2024 - 至今',
    title: 'AI 数据训练师',
    organization: 'AI 训练平台',
    description: '从事大模型训练数据生产，负责数据标注、质量审核与 RLHF 反馈，持续输出高质量科技内容。',
  },
  {
    year: '2023 - 至今',
    title: '创意内容创造者',
    organization: '独立创作',
    description: '专注科技与嵌入式方向的内容创作，分享单片机项目、电气知识与 AI 行业见解。',
  },
  {
    year: '2021 - 至今',
    title: '电气工程师',
    organization: '电气工程领域',
    description: '从事电路设计、PCB 布板与电气系统分析，积累丰富的工业与消费电子项目经验。',
  },
  {
    year: '2019 - 至今',
    title: '单片机爱好发烧友',
    organization: '硬件创客社区',
    description: '深度玩转 Arduino、STM32、ESP32，参与开源硬件项目，热衷于将代码与电路融为一体。',
  },
]
