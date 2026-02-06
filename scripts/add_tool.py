#!/usr/bin/env python3
"""
Add Tool Script - Automates adding new affiliate tools to aitimized.com

Usage:
    python scripts/add_tool.py --name "Tool Name" --url "https://partnerstack.com/tool"
    
Optional arguments:
    --description "Tool description"
    --category "Category name"
    --benefit "Optimization benefit"
    --pricing "Pricing info"
    --features "feature1,feature2,feature3"
    --pros "pro1,pro2,pro3"
    --cons "con1,con2,con3"
"""

import argparse
import json
import re
import sys
from pathlib import Path


def slugify(text):
    """Convert text to URL-friendly slug"""
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')


def parse_list_arg(arg):
    """Parse comma-separated list argument"""
    if not arg:
        return []
    return [item.strip() for item in arg.split(',') if item.strip()]


def add_tool_to_data_file(tool_data, lib_path):
    """Add tool data to lib/tools.ts"""
    tools_file = lib_path / 'tools.ts'
    
    if not tools_file.exists():
        print(f"Error: {tools_file} not found")
        return False
    
    content = tools_file.read_text()
    
    # Find the tools array
    tools_array_match = re.search(r'export const tools: Tool\[\] = \[(.*?)\];', content, re.DOTALL)
    if not tools_array_match:
        print("Error: Could not find tools array in tools.ts")
        return False
    
    # Create new tool object string
    features_str = json.dumps(tool_data.get('features', []), indent=6)
    pros_str = json.dumps(tool_data.get('pros', []), indent=6)
    cons_str = json.dumps(tool_data.get('cons', []), indent=6)
    
    new_tool = f'''  {{
    id: '{tool_data['id']}',
    name: '{tool_data['name']}',
    description: '{tool_data['description']}',
    optimizationBenefit: '{tool_data['optimizationBenefit']}',
    category: '{tool_data['category']}',
    partnerStackUrl: '{tool_data['partnerStackUrl']}',
    features: {features_str},
    pros: {pros_str},
    cons: {cons_str},
    pricing: '{tool_data.get('pricing', '')}',
  }}'''
    
    # Insert before the closing bracket of the array
    existing_tools = tools_array_match.group(1).strip()
    if existing_tools:
        new_tools_array = f"export const tools: Tool[] = [\n{existing_tools},\n{new_tool}\n];"
    else:
        new_tools_array = f"export const tools: Tool[] = [\n{new_tool}\n];"
    
    # Replace the tools array
    new_content = content.replace(tools_array_match.group(0), new_tools_array)
    
    # Write back to file
    tools_file.write_text(new_content)
    print(f"✅ Added {tool_data['name']} to lib/tools.ts")
    return True


def create_comparison_entry(tool_id, tool_name, lib_path):
    """Add tool to comparison slug list (optional)"""
    # This is just a helper function to suggest comparison pages
    print(f"\n💡 Comparison page suggestion:")
    print(f"   You can create a comparison page like: /tools/compare/{tool_id}-vs-other-tool")
    print(f"   Add this to the comparisons array in app/tools/compare/[slug]/page.tsx:")
    print(f"   {{ slug: '{tool_id}-vs-other-tool', toolAId: '{tool_id}', toolBId: 'other-tool' }},")


def main():
    parser = argparse.ArgumentParser(
        description='Add a new affiliate tool to aitimized.com',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )
    
    # Required arguments
    parser.add_argument('--name', required=True, help='Tool name')
    parser.add_argument('--url', required=True, help='PartnerStack affiliate URL')
    
    # Optional arguments
    parser.add_argument('--description', default='', help='Tool description')
    parser.add_argument('--category', default='AI Tools', help='Tool category')
    parser.add_argument('--benefit', default='', help='Optimization benefit')
    parser.add_argument('--pricing', default='', help='Pricing information')
    parser.add_argument('--features', default='', help='Comma-separated features')
    parser.add_argument('--pros', default='', help='Comma-separated pros')
    parser.add_argument('--cons', default='', help='Comma-separated cons')
    
    args = parser.parse_args()
    
    # Get project root
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    lib_path = project_root / 'lib'
    
    # Generate tool ID
    tool_id = slugify(args.name)
    
    # Prepare tool data
    tool_data = {
        'id': tool_id,
        'name': args.name,
        'description': args.description or f'{args.name} - AI-powered business tool',
        'optimizationBenefit': args.benefit or f'Optimize your workflow with {args.name}',
        'category': args.category,
        'partnerStackUrl': args.url,
        'features': parse_list_arg(args.features) or [
            'AI-powered automation',
            'Easy to use interface',
            'Integration capabilities'
        ],
        'pros': parse_list_arg(args.pros) or [
            'User-friendly',
            'Good customer support',
            'Regular updates'
        ],
        'cons': parse_list_arg(args.cons) or [
            'Premium pricing',
            'Learning curve for beginners'
        ],
        'pricing': args.pricing or 'Contact for pricing',
    }
    
    print(f"\n🔧 Adding new tool: {args.name}")
    print(f"   ID: {tool_id}")
    print(f"   Category: {args.category}")
    print(f"   URL: {args.url}")
    
    # Add tool to data file
    if add_tool_to_data_file(tool_data, lib_path):
        print(f"\n✅ Tool added successfully!")
        print(f"\n📝 Next steps:")
        print(f"   1. Review the tool data in lib/tools.ts")
        print(f"   2. The tool page will be available at: /tools/{tool_id}")
        print(f"   3. The affiliate link will be available at: /go/{tool_id}")
        print(f"   4. Run 'npm run build' to generate the static pages")
        
        create_comparison_entry(tool_id, args.name, lib_path)
        
        return 0
    else:
        print("\n❌ Failed to add tool")
        return 1


if __name__ == '__main__':
    sys.exit(main())
