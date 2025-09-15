import os
import json
import glob

def process_detail_files():
    """
    处理当前文件夹中所有以_detail.json结尾的文件
    """
    # 获取当前工作目录
    current_dir = os.getcwd()
    print(f"当前工作目录: {current_dir}")
    
    # 查找所有以_detail.json结尾的文件（不包括子文件夹）
    detail_files = glob.glob("*_detail.json")
    
    if not detail_files:
        print("未找到任何_detail.json文件")
        return
    
    print(f"找到 {len(detail_files)} 个_detail.json文件: {detail_files}")
    
    for detail_file in detail_files:
        print(f"\n正在处理文件: {detail_file}")
        
        # 1. 获取项目名（去掉_detail.json后缀）
        project_name = detail_file.replace("_detail.json", "")
        print(f"项目名: {project_name}")
        
        # 检查项目文件夹是否存在
        project_folder = os.path.join(current_dir, project_name)
        if not os.path.exists(project_folder):
            print(f"警告: 项目文件夹 {project_folder} 不存在，跳过此文件")
            continue
        
        try:
            # 2. 读取JSON文件
            with open(detail_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            if not isinstance(data, dict):
                print(f"警告: {detail_file} 不是有效的JSON对象，跳过")
                continue
            
            # 获取前200个键值对
            keys = list(data.keys())[:200]
            print(f"将处理前 {len(keys)} 个键值对")
            
            # 3. 为每个键值对创建单独的JSON文件
            for key in keys:
                # 将键中的特殊字符替换为安全字符
                safe_key = key.replace(':', '_').replace('/', '_').replace('\\', '_').replace('?', '_').replace('*', '_').replace('<', '_').replace('>', '_').replace('|', '_').replace('"', '_').replace(' ', '_')
                # 移除连续的下划线
                safe_key = '_'.join(filter(None, safe_key.split('_')))
                
                # 创建文件名
                output_filename = f"{safe_key}_main.json"
                output_path = os.path.join(project_folder, output_filename)
                
                # 创建包含单个键值对的JSON对象
                single_item = {key: data[key]}
                
                # 写入文件
                with open(output_path, 'w', encoding='utf-8') as f:
                    json.dump(single_item, f, ensure_ascii=False, indent=2)
                
                print(f"已创建: {output_filename}")
            
            # 4. 删除原始文件
            os.remove(detail_file)
            print(f"已删除原始文件: {detail_file}")
            
        except json.JSONDecodeError as e:
            print(f"错误: 无法解析JSON文件 {detail_file}: {e}")
        except Exception as e:
            print(f"错误: 处理文件 {detail_file} 时发生异常: {e}")
    
    print("\n处理完成！")

if __name__ == "__main__":
    process_detail_files()