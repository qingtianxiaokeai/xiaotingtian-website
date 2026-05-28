import type { Skill, TimelineItem } from '@/types'

export const skills: Skill[] = [
  { name: 'Prompt 调优', icon: '🤖', category: 'AI 数据训练', level: 88, description: '精通系统提示词设计与迭代优化，通过结构化指令引导模型精准理解任务意图，持续提升输出质量与一致性' },
  { name: '数据标注 & 清洗', icon: '🏷️', category: 'AI 数据训练', level: 92, description: '高质量数据标注与清洗，涵盖多轮对话、指令遵循与格式规范，为大模型训练流程奠定数据基础' },
  { name: 'SFT 监督微调', icon: '🎯', category: 'AI 数据训练', level: 82, description: '基于高质量标注数据对基座模型进行监督微调，涵盖指令遵循、格式规范及领域适配，使模型稳定输出符合预期的响应' },
  { name: '模型评估 & RLHF', icon: '📊', category: 'AI 数据训练', level: 85, description: '基于人类反馈的强化学习数据生产与质量把控，构建偏好排序数据以对齐模型输出与人类价值观' },
  { name: '高质量数据构建', icon: '🗂️', category: 'AI 数据训练', level: 86, description: '系统化构建训练数据集，涵盖人工撰写、模型合成、多样性采样与严格质量过滤，确保数据准确性与分布均衡' },
  { name: 'Workflow 提效', icon: '⚡', category: 'AI 数据训练', level: 80, description: '设计并优化 AI 训练全流程 Pipeline，涵盖数据采集、标注、评测与交付，通过自动化工具链提升协作效率' },
  { name: '边界 Case 优化', icon: '🔍', category: 'AI 数据训练', level: 83, description: '识别并攻克模型在极端输入、长尾场景下的失败案例，通过针对性数据补充与策略调整持续压缩能力盲区' },
  { name: 'Python 数据处理', icon: '🐍', category: 'AI 数据训练', level: 80, description: '数据处理脚本、自动化标注流程与批量质检分析，提升数据生产效率' },
]

export const timeline: TimelineItem[] = [
  {
    year: '2024 - 至今',
    title: 'AI 数据训练师',
    organization: 'AI 训练平台',
    description: '从事大模型训练数据生产，负责数据标注、质量审核与 RLHF 反馈，持续输出高质量训练数据。',
  },
]
