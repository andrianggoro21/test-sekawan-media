const calculateOverviewData = (data) => {
  const unresolvedTickets = data.Tickets.filter(ticket => ticket.status !== 'Closed');
  const overdueTickets = unresolvedTickets.filter(ticket => {
    const assignment = data.Ticket_Assignments.find(ta => ta.ticket_id === ticket.ticket_id);
    const sla = data.Service_Level_Agreements.find(sla => sla.priority === ticket.priority);
    if (!assignment || !sla) return false;
    const createdAt = new Date(ticket.created_at);
    const resolvedAt = assignment.resolved_at ? new Date(assignment.resolved_at) : new Date();
    const resolutionTime = (resolvedAt - createdAt) / (1000 * 60 * 60); // in hours
    return resolutionTime > sla.resolution_time;
  });

  const openTickets = data.Tickets.filter(ticket => ticket.status === 'Open');
  const resolvedTickets = data.Tickets.filter(ticket => ticket.status === 'Closed');
  
  const resolvedCount = resolvedTickets.length;
  const receivedCount = data.Tickets.length;
  
  const avgFirstResponseTime = unresolvedTickets.length 
    ? (unresolvedTickets.reduce((sum, ticket) => {
        const assignment = data.Ticket_Assignments.find(ta => ta.ticket_id === ticket.ticket_id);
        if (!assignment) return sum;
        const createdAt = new Date(ticket.created_at);
        const firstResponseAt = new Date(assignment.assigned_at);
        const responseTime = (firstResponseAt - createdAt) / (1000 * 60); // in minutes
        return sum + responseTime;
      }, 0) / unresolvedTickets.length).toFixed(2)
    : '0.00';
  
  const avgResponseTime = resolvedTickets.length 
    ? (resolvedTickets.reduce((sum, ticket) => {
        const assignment = data.Ticket_Assignments.find(ta => ta.ticket_id === ticket.ticket_id);
        if (!assignment || !assignment.resolved_at) return sum;
        const createdAt = new Date(ticket.created_at);
        const resolvedAt = new Date(assignment.resolved_at);
        const responseTime = (resolvedAt - createdAt) / (1000 * 60 * 60); // in hours
        return sum + responseTime;
      }, 0) / resolvedTickets.length).toFixed(2)
    : '0.00';
  
  const resolutionWithinSLA = resolvedTickets.length 
    ? ((resolvedTickets.filter(ticket => {
        const assignment = data.Ticket_Assignments.find(ta => ta.ticket_id === ticket.ticket_id);
        const sla = data.Service_Level_Agreements.find(sla => sla.priority === ticket.priority);
        if (!assignment || !sla) return false;
        const createdAt = new Date(ticket.created_at);
        const resolvedAt = new Date(assignment.resolved_at);
        const resolutionTime = (resolvedAt - createdAt) / (1000 * 60 * 60); // in hours
        return resolutionTime <= sla.resolution_time;
      }).length / resolvedTickets.length) * 100).toFixed(2)
    : '0.00';


  const trends = [];
  const ticketCreationDates = {};

  // Initialize ticket creation dates for each day
  data.Tickets.forEach(ticket => {
    const createdAt = new Date(ticket.created_at);
    const dateKey = createdAt.toISOString().split('T')[0];
    if (!ticketCreationDates[dateKey]) {
      ticketCreationDates[dateKey] = 0;
    }
    ticketCreationDates[dateKey]++;
  });

  // Prepare trends data
  Object.keys(ticketCreationDates).forEach(date => {
    trends.push({
      name: date,
      today: ticketCreationDates[date]
    });
  });

  return {
    unresolved: unresolvedTickets.length,
    overdue: overdueTickets.length,
    open: openTickets.length,
    on_hold: unresolvedTickets.length,
    resolved: resolvedCount,
    received: receivedCount,
    avg_first_response_time: `${avgFirstResponseTime}m`,
    avg_response_time: `${avgResponseTime}h`,
    resolution_within_sla: `${resolutionWithinSLA}%`,
    unresolved_tickets: [
      { label: 'Waiting on Feature Request', count: unresolvedTickets.filter(ticket => ticket.priority === 'High').length },
      { label: 'Awaiting Customer Response', count: unresolvedTickets.filter(ticket => ticket.priority === 'Medium').length },
      { label: 'Awaiting Developer Fix', count: unresolvedTickets.filter(ticket => ticket.priority === 'Low').length },
      { label: 'Pending', count: unresolvedTickets.filter(ticket => ticket.priority === 'Low').length }
    ],
    tasks: [
      { label: 'Finish ticket update', priority: 'urgent', completed: false },
      { label: 'Create new ticket example', priority: 'new', completed: false },
      { label: 'Update ticket report', priority: 'default', completed: false }
    ],
    trends
  };
};

export default calculateOverviewData;
