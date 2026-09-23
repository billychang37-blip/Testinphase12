import re

new_render_transaction = '''  const renderTransaction = (tx: any) => {
    let icon;
    let bgClass;
    let textClass;
    let title;
    let isPositive = false;
    let subtitle = tx.description || 'Blockchain Transaction';
    let amountString = `${Number(tx.amount || 0).toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    let currencySuffix = tx.wallet_used !== 'main' ? ((tx.wallet_used || '').startsWith('usdt') ? ' USDT' : ((tx.wallet_used || '').startsWith('usdc') ? ' USDC' : '')) : '';
    let displayAmount = '';

    if (tx.type === 'deposit') {
      isPositive = true;
      bgClass = tx.wallet_used === 'main' ? 'bg-blue-50' : 'bg-emerald-50';
      textClass = tx.wallet_used === 'main' ? 'text-blue-600' : 'text-emerald-600';
      icon = tx.wallet_used === 'main' ? <Landmark className="w-5 h-5" /> : <ArrowDownToLine className="w-5 h-5" />;
      title = tx.wallet_used === 'main' 
                ? (tx.sender_name ? `Deposit from ${tx.sender_name}` : 'Bank Deposit') 
                : `${currencySuffix.trim() || 'Crypto'} Deposit`;
      subtitle = tx.wallet_used === 'main' ? (tx.bank_name || 'Bank Transfer') : 'Blockchain Network';
      displayAmount = `+${tx.wallet_used === 'main' ? currencySymbol : ''}${amountString}${currencySuffix}`;
    } else if (tx.type === 'kyc_request') {
      isPositive = false;
      bgClass = 'bg-purple-50';
      textClass = 'text-purple-600';
      icon = <User className="w-5 h-5" />;
      title = 'KYC Submission';
      subtitle = 'Identity Verification';
      displayAmount = `$0.00`;
    } else if (tx.type === 'soft_token_purchase') {
      isPositive = false;
      bgClass = 'bg-amber-50';
      textClass = 'text-amber-600';
      icon = <KeyRound className="w-5 h-5" />;
      title = 'Soft Token Activation';
      subtitle = 'E-Token OTP Fee';
      displayAmount = `-${currencySymbol}${amountString}`;
    } else {
      isPositive = false;
      bgClass = 'bg-red-50';
      textClass = 'text-red-600';
      icon = <ArrowUpRight className="w-5 h-5" />;
      title = tx.type === 'crypto_transfer' ? 'Crypto Transfer' : (tx.type === 'transfer' ? 'Fund Transfer' : 'Withdrawal');
      subtitle = tx.description || 'Fund Transfer';
      displayAmount = `-${tx.wallet_used === 'main' ? currencySymbol : ''}${amountString}${currencySuffix}`;
    }

    return (
      <div key={tx.id} className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 hover:bg-gray-50/80 transition-colors cursor-pointer last:border-0 group">
        <div className="flex items-center gap-4 md:gap-5">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${bgClass} ${textClass}`}>
            {icon}
          </div>
          <div className="flex flex-col">
            <h3 className="text-[15px] md:text-[16px] font-semibold text-gray-900 leading-tight mb-1">
              {title}
            </h3>
            <div className="flex items-center text-[12px] md:text-[13px] text-gray-500 gap-1.5 md:gap-2">
              <span>{new Date(tx.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} &bull; {new Date(tx.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="truncate max-w-[120px] sm:max-w-[200px] font-medium">{subtitle}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end text-right">
          <span className={`text-[15px] md:text-[16px] font-bold ${isPositive ? 'text-emerald-600' : (tx.type === 'kyc_request' ? 'text-gray-600' : 'text-gray-900')}`}>
            {displayAmount}
          </span>
          <div className="mt-1">
            <span className={`text-[10px] md:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              (tx.status || 'completed').toLowerCase() === 'completed' ? 'bg-emerald-100 text-emerald-700' :
              (tx.status || 'completed').toLowerCase() === 'pending' ? 'bg-amber-100 text-amber-700' :
              'bg-red-100 text-red-700'
            }`}>
              {['rejected', 'unapproved', 'failed'].includes((tx.status || '').toLowerCase()) ? 'failed' : (tx.status || 'Completed')}
            </span>
          </div>
        </div>
      </div>
    );
  };'''

def replace_render_tx(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Revert first if needed, actually I'll just check it out from git to get the original state.
    pass

