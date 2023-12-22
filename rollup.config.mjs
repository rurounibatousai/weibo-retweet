import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';

export default {
  input: 'auto.ts',
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    terser({
      compress: {
        // 更激进的压缩选项
        passes: 2, // 设置压缩的通行次数
        keep_fargs: false, // 是否保留未使用的函数参数
        pure_getters: true, // 移除对象属性的引用，只留下值
        unsafe: true, // 启用不安全优化，可能导致运行时错误
        unsafe_comps: true, // 移除比较操作中的无副作用代码
        unsafe_Function: true, // 移除无副作用的函数声明
        unsafe_math: true, // 移除 Math 对象上的无副作用成员
        unsafe_methods: true, // 移除对象上的无副作用方法
        unsafe_proto: true, // 移除 __proto__ 属性
        unsafe_regexp: true, // 移除 RegExp 构造函数中的无副作用选项
        unsafe_undefined: true, // 移除 undefined 变量
        // 更多的压缩选项...
      },
    }),
  ],
};
